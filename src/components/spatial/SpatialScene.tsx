import type { ReactNode } from "react";

type SpatialSceneProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "main";
};

export function SpatialScene({
  children,
  className = "",
  as: Tag = "section",
}: SpatialSceneProps) {
  return (
    <Tag className={`spatial-scene ${className}`}>
      {children}
    </Tag>
  );
}
