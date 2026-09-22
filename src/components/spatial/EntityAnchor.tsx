import type { ReactNode } from "react";

type EntityAnchorProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export function EntityAnchor({
  children,
  className = "",
  label,
}: EntityAnchorProps) {
  return (
    <div
      className={`entity-anchor ${className}`}
      data-entity-label={label}
    >
      {children}
    </div>
  );
}
