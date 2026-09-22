type SectionLabelProps = {
  index?: string;
  children: string;
};

export function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 text-[var(--runsys-muted)]">
      {index ? (
        <span className="runsys-label text-[var(--runsys-accent)]">
          {index}
        </span>
      ) : null}

      <span className="runsys-label">{children}</span>
    </div>
  );
}
