import type { ReactNode } from "react";
import { cx } from "../lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return <Tag className={cx("mx-auto w-full max-w-6xl px-6 sm:px-8", className)}>{children}</Tag>;
}
