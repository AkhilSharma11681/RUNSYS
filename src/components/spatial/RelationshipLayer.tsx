import type { ReactNode } from "react";

type RelationshipLayerProps = {
  children: ReactNode;
  className?: string;
};

export function RelationshipLayer({
  children,
  className = "",
}: RelationshipLayerProps) {
  return (
    <div className={`relationship-layer ${className}`}>
      {children}
    </div>
  );
}
