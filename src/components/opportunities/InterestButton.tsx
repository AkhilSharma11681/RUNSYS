"use client";

import { FormEvent, useState } from "react";

type InterestButtonProps = {
  opportunitySlug?: string;
};

export function InterestButton({
  opportunitySlug = "this opportunity",
}: InterestButtonProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          opportunity: opportunitySlug,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setSubmitted(true);
      form.reset();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send your interest.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="interest-success">
        <span className="interest-success-signal" aria-hidden="true" />
        <div>
          <strong>Interest registered.</strong>
          <span>We have your request for {opportunitySlug}.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="editorial-action"
        onClick={() => setOpen(true)}
      >
        Express interest
        <span aria-hidden="true">→</span>
      </button>

      {open ? (
        <div
          className="interest-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            className="interest-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="interest-title"
          >
            <button
              type="button"
              className="interest-close"
              onClick={() => setOpen(false)}
              aria-label="Close interest form"
            >
              ×
            </button>

            <span className="interest-label">START THE CONNECTION</span>

            <h2 id="interest-title">
              Express
              <br />
              interest.
            </h2>

            <p className="interest-context">{opportunitySlug}</p>

            <form onSubmit={handleSubmit} className="interest-form">
              <label>
                <span>Name</span>
                <input name="name" type="text" required placeholder="Your name" />
              </label>

              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </label>

              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what you're interested in..."
                />
              </label>

              {error ? (
                <p className="interest-error" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="interest-submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send interest"}
                <span aria-hidden="true">↗</span>
              </button>
            </form>

            <p className="interest-note">
              Your details are only used to start this connection.
            </p>
          </section>
        </div>
      ) : null}
    </>
  );
}
