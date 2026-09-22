import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/neon";

type InterestPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  opportunity?: unknown;
};

type OpportunityRow = {
  id: string;
  status: string;
};

type ExistingInterestRow = {
  id: string;
};

async function queryRows<T>(
  query: PromiseLike<unknown>,
): Promise<T[]> {
  return (await query) as T[];
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return getDb();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InterestPayload;

    const name =
      typeof payload.name === "string"
        ? payload.name.trim()
        : "";

    const email =
      typeof payload.email === "string"
        ? payload.email.trim().toLowerCase()
        : "";

    const message =
      typeof payload.message === "string"
        ? payload.message.trim()
        : "";

    const opportunity =
      typeof payload.opportunity === "string"
        ? payload.opportunity.trim()
        : "";

    if (!name || !email || !opportunity) {
      return NextResponse.json(
        {
          ok: false,
          error: "Name, email, and opportunity are required.",
        },
        { status: 400 },
      );
    }

    if (name.length > 120) {
      return NextResponse.json(
        {
          ok: false,
          error: "Name is too long.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email) || email.length > 320) {
      return NextResponse.json(
        {
          ok: false,
          error: "Enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        {
          ok: false,
          error: "Message is too long.",
        },
        { status: 400 },
      );
    }

    const sql = getSql();

    const opportunityRows = await queryRows<OpportunityRow>(sql`
      SELECT id, status
      FROM opportunities
      WHERE slug = ${opportunity}
      LIMIT 1
    `);

    const opportunityRecord = opportunityRows[0];

    if (!opportunityRecord) {
      return NextResponse.json(
        {
          ok: false,
          error: "Opportunity not found.",
        },
        { status: 404 },
      );
    }

    if (
      opportunityRecord.status !== "AVAILABLE" &&
      opportunityRecord.status !== "INTERESTED"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "This opportunity is no longer accepting interest.",
        },
        { status: 409 },
      );
    }

    const existingRows = await queryRows<ExistingInterestRow>(sql`
      SELECT id
      FROM interests
      WHERE opportunity_id = ${opportunityRecord.id}
        AND lower(email) = ${email}
      LIMIT 1
    `);

    if (existingRows[0]) {
      return NextResponse.json(
        {
          ok: true,
          duplicate: true,
          message: "Your interest has already been received.",
        },
        { status: 200 },
      );
    }

    await sql`
      INSERT INTO interests (
        opportunity_id,
        name,
        email,
        message
      )
      VALUES (
        ${opportunityRecord.id},
        ${name},
        ${email},
        ${message || null}
      )
    `;

    if (opportunityRecord.status === "AVAILABLE") {
      await sql`
        UPDATE opportunities
        SET status = 'INTERESTED'
        WHERE id = ${opportunityRecord.id}
          AND status = 'AVAILABLE'
      `;
    }

    return NextResponse.json({
      ok: true,
      duplicate: false,
    });
  } catch (error) {
    console.error("Interest submission failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to submit your interest right now.",
      },
      { status: 500 },
    );
  }
}
