import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type InterestPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  opportunity?: unknown;
};

export async function POST(request: Request) {
  let payload: InterestPayload;

  try {
    payload = (await request.json()) as InterestPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const opportunity =
    typeof payload.opportunity === "string"
      ? payload.opportunity.trim()
      : "";

  if (!name || !email || !opportunity) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and opportunity are required." },
      { status: 400 },
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { data: opportunityRecord, error: opportunityError } = await supabase
      .from("opportunities")
      .select("id")
      .eq("title", opportunity)
      .maybeSingle() as unknown as {
        data: { id: string } | null;
        error: { message: string } | null;
      };

    if (opportunityError) {
      console.error("[RUNSYS interest] opportunity lookup failed", opportunityError);

      return NextResponse.json(
        { ok: false, error: "Unable to process the interest right now." },
        { status: 500 },
      );
    }

    if (!opportunityRecord) {
      return NextResponse.json(
        { ok: false, error: "Opportunity not found." },
        { status: 404 },
      );
    }

    const interestInsert = {
      opportunity_id: opportunityRecord.id,
      name,
      email,
      message: message || null,
    };

    const { error } = await supabase
      .from("interests")
      .insert(interestInsert as never);

    if (error) {
      console.error("[RUNSYS interest] insert failed", error);

      return NextResponse.json(
        { ok: false, error: "Unable to save your interest right now." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Interest received.",
    });
  }

  console.info("[RUNSYS interest:development]", {
    name,
    email,
    message,
    opportunity,
  });

  return NextResponse.json({
    ok: true,
    message: "Interest received.",
    developmentMode: true,
  });
}
