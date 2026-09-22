import type { ReactNode } from "react";

type ContextLayerProps = {
  children: ReactNode;
  className?: string;
};

export function ContextLayer({
  children,
  className = "",
}: ContextLayerProps) {
  return <div className={`context-layer ${className}`}>{children}</div>;
}
