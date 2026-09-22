type EntityMetaProps = {
  eyebrow: string;
  value: string;
  muted?: boolean;
};

export function EntityMeta({
  eyebrow,
  value,
  muted = false,
}: EntityMetaProps) {
  return (
    <div className={`entity-meta ${muted ? "entity-meta-muted" : ""}`}>
      <span>{eyebrow}</span>
      <strong>{value}</strong>
    </div>
  );
}
