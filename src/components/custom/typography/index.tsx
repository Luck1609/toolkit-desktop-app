import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type TypograyphyChildren = {
  children: string | ReactNode;
  className?: string;
};

export function TypographyH1({ children, className }: TypograyphyChildren) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypograyphyChildren) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypograyphyChildren) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: TypograyphyChildren) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyH5({ children, className }: TypograyphyChildren) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographySm({ children, className }: TypograyphyChildren) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function TypographyXs({ children, className }: TypograyphyChildren) {
  return (
    <small className={cn("text-xs font-medium leading-none", className)}>
      {children}
    </small>
  );
}
export function TypographyP({ children, className }: TypograyphyChildren) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}
