"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

type EntityLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  transitionName?: string;
};

export function EntityLink({
  href,
  children,
  className = "",
  transitionName,
}: EntityLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      typeof document !== "undefined"
    ) {
      event.preventDefault();

      const startTransition = (
        document as Document & {
          startViewTransition?: (callback: () => void) => unknown;
        }
      ).startViewTransition;

      if (startTransition) {
        startTransition(() => router.push(href));
      } else {
        router.push(href);
      }
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={
        transitionName
          ? ({ viewTransitionName: transitionName } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </a>
  );
}
