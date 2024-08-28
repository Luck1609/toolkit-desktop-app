import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode,
  className?: string
}

export function TypographyH1({ children, className }: IProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-5xl font-extrabold lg:text-6xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: IProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-4xl lg:text-5xl font-semibold first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: IProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-3xl lg:text-4xl font-semibold",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: IProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-2xl lg:text-3xl font-semibold",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyH5({ children, className }: IProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl lg:text-2xl font-semibold",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyH6({ children, className }: IProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg lg:text-xl font-semibold",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographySm({ children, className }: IProps) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function TypographyXs({ children, className }: IProps) {
  return (
    <small className={cn("text-xs font-medium leading-none", className)}>
      {children}
    </small>
  );
}
export function Typography({ children, className }: IProps) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

export function TypographyLead({ children, className }: IProps) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>
      {children}
    </p>
  )
}

