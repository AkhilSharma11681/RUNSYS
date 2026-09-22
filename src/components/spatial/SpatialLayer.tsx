import type { ReactNode } from "react";

type SpatialLayerProps = {
  children: ReactNode;
  depth?: "ambient" | "media" | "entity" | "context" | "foreground";
  className?: string;
};

export function SpatialLayer({
  children,
  depth = "entity",
  className = "",
}: SpatialLayerProps) {
  return (
    <div
      data-depth={depth}
      className={`spatial-layer spatial-layer-${depth} ${className}`}
    >
      {children}
    </div>
  );
}
