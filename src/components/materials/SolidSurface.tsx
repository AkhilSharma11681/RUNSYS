import type { ReactNode } from "react";

type SolidSurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function SolidSurface({
  children,
  className = "",
}: SolidSurfaceProps) {
  return <div className={`material-solid ${className}`}>{children}</div>;
}
