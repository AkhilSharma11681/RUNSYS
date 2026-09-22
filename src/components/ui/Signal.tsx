type SignalProps = {
  children: string;
  tone?: "available" | "active" | "neutral";
};

export function Signal({
  children,
  tone = "neutral",
}: SignalProps) {
  return (
    <span className={`signal signal-${tone}`}>
      <span className="signal-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
