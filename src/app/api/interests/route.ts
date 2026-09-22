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
};

async function queryRows<T>(query: PromiseLike<unknown>): Promise<T[]> {
  return (await query) as T[];
}

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return getDb();
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InterestPayload;

    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email =
      typeof payload.email === "string" ? payload.email.trim() : "";
    const message =
      typeof payload.message === "string" ? payload.message.trim() : "";
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

    const sql = getSql();

    const opportunityRows = await queryRows<OpportunityRow>(sql`
      SELECT id
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

    return NextResponse.json({ ok: true });
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
