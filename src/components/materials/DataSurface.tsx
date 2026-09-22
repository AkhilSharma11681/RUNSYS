import type { ReactNode } from "react";

type DataSurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function DataSurface({
  children,
  className = "",
}: DataSurfaceProps) {
  return <div className={`material-data ${className}`}>{children}</div>;
}
