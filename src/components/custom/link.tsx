import React, { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { Link } from "react-router-dom";


type linkProps = {
  url: string;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
  children: ReactNode;
  disabled?: boolean
};

export default function LinkTag({
  url,
  target,
  className = "",
  children,
  ...props
}: linkProps) {
  return (
    <Link
      to={target ? { pathname: url } : url}
      rel="noopener noreferrer"
      target={target && "_blank"}
      className={className}
      disabled={true}
      {...props}
    >
      {children}
    </Link>
  );
}
