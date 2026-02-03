import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterSocialsProps {
  className?: string;
}

const FooterSocials: React.FC<FooterSocialsProps> = ({ className }) => {
  const socialLinks: SocialLink[] = [
    {
      icon: <FaTwitter />,
      href: "#",
      label: "Twitter",
    },
    {
      icon: <FaFacebookF />,
      href: "#",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      href: "#",
      label: "Instagram",
    },
    {
      icon: <FaGithub />,
      href: "#",
      label: "GitHub",
    },
  ];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((social, idx) => (
        <Link
          key={idx}
          href={social.href}
          aria-label={social.label}
          className="rounded-full bg-white text-black hover:text-white p-2.5 hover:bg-black/90 transition-colors duration-200 cursor-pointer"
        >
          <span className="text-base">{social.icon}</span>
        </Link>
      ))}
    </div>
  );
};

export default FooterSocials;
