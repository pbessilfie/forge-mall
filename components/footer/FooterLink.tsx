import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "text-sm text-black/60 hover:text-black transition-colors duration-200",
          className
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default FooterLink;
