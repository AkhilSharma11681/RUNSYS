import type { ReactNode } from "react";

type GlassSurfaceProps = {
  children: ReactNode;
  variant?: "soft" | "dense";
  className?: string;
};

export function GlassSurface({
  children,
  variant = "soft",
  className = "",
}: GlassSurfaceProps) {
  return (
    <div
      className={`material-glass material-glass-${variant} ${className}`}
    >
      {children}
    </div>
  );
}
