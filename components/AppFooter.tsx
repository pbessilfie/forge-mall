"use client";

import { motion } from "motion/react";
import FooterSection from "./footer/FooterSection";
import FooterLink from "./footer/FooterLink";
import FooterSocials from "./footer/FooterSocials";
import NewsletterBanner from "./banners/NewsletterBanner";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";
import Link from "next/link";
import {
  footerFadeUp,
  footerContentContainer,
  footerContentItem,
} from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const AppFooter = () => {
  const prefersReducedMotion = useReducedMotion();
  const companyLinks = [
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Works", href: "#" },
    { label: "Career", href: "#" },
  ];

  const helpLinks = [
    { label: "Customer Support", href: "#" },
    { label: "Delivery Details", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ];

  const faqLinks = [
    { label: "Account", href: "#" },
    { label: "Manage Deliveries", href: "#" },
    { label: "Orders", href: "#" },
    { label: "Payments", href: "#" },
  ];

  const resourceLinks = [
    { label: "Free eBooks", href: "#" },
    { label: "Development Tutorial", href: "#" },
    { label: "How to - Blog", href: "#" },
    { label: "Youtube Playlist", href: "#" },
  ];

  const MotionFooter = prefersReducedMotion ? "footer" : motion.footer;
  const MotionDiv = prefersReducedMotion ? "div" : motion.div;

  return (
    <MotionFooter
      {...(!prefersReducedMotion && {
        variants: footerFadeUp,
        initial: "initial",
        whileInView: "animate",
        viewport: { once: true, margin: "-50px" },
      })}
      className="relative bg-[#f0f0f0] mt-10"
    >
      {/* Newsletter Banner */}
      <div className="relative h-fit">
        <div className=" w-[90%] mx-auto z-10 relative">
          <NewsletterBanner />
        </div>
        <div className="bg-white h-1/2 w-full absolute top-0 left-0"></div>
        <div className="bg-[#f0f0f0] h-1/2 w-full absolute bottom-0 left-0"></div>
      </div>

      {/* Main Footer Content */}
      <div className="px-5 md:px-7 lg:px-12 xl:px-20 py-10 lg:py-12 ">
        <div className="container mx-auto">
          <MotionDiv
            {...(!prefersReducedMotion && {
              variants: footerContentContainer,
              initial: "initial",
              whileInView: "animate",
              viewport: { once: true, margin: "-30px" },
            })}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"
          >
            {/* Brand Section */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: footerContentItem })}
              className="lg:col-span-1 flex flex-col gap-6"
            >
              <h1 className="font-bold text-3xl text-black">
                <Link href="/discover"> FORGE.MALL</Link>
              </h1>
              <p className="text-sm text-black/60 leading-relaxed">
                We have clothes that suits your style and which you&apos;re
                proud to wear. From women to men.
              </p>
              <FooterSocials />
            </MotionDiv>

            {/* Company Links */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: footerContentItem })}
            >
              <FooterSection title="Company">
                {companyLinks.map((link, idx) => (
                  <FooterLink key={idx} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterSection>
            </MotionDiv>

            {/* Help Links */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: footerContentItem })}
            >
              <FooterSection title="Help">
                {helpLinks.map((link, idx) => (
                  <FooterLink key={idx} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterSection>
            </MotionDiv>

            {/* FAQ Links */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: footerContentItem })}
            >
              <FooterSection title="FAQ">
                {faqLinks.map((link, idx) => (
                  <FooterLink key={idx} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterSection>
            </MotionDiv>

            {/* Resources Links */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: footerContentItem })}
            >
              <FooterSection title="Resources">
                {resourceLinks.map((link, idx) => (
                  <FooterLink key={idx} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterSection>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>

      {/* Footer Bottom */}
      <MotionDiv
        {...(!prefersReducedMotion && {
          variants: footerContentItem,
          initial: "initial",
          whileInView: "animate",
          viewport: { once: true },
        })}
        className="border-t border-black/10 container mx-auto"
      >
        <div className="px-5 md:px-7 lg:px-12 xl:px-20 py-6">
          <div className=" flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-black/60">
              Forge.mall © 2000-2023, All Rights Reserved
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-md p-2 border border-black/10">
                <FaCcVisa className="text-2xl text-[#1A1F71]" />
              </div>
              <div className="bg-white rounded-md p-2 border border-black/10">
                <FaCcMastercard className="text-2xl text-[#EB001B]" />
              </div>
              <div className="bg-white rounded-md p-2 border border-black/10">
                <FaCcPaypal className="text-2xl text-[#003087]" />
              </div>
              <div className="bg-white rounded-md p-2 border border-black/10">
                <FaApplePay className="text-2xl text-black" />
              </div>
              <div className="bg-white rounded-md p-2 border border-black/10">
                <FaGooglePay className="text-2xl text-black" />
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>
    </MotionFooter>
  );
};

export default AppFooter;
