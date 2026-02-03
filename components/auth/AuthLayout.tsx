"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion-variants";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <main className="min-h-dvh bg-white">
      <div className="flex items-center justify-center px-5 py-12 md:py-16 lg:py-20">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className={cn(
            "w-full max-w-md mx-auto",
            className
          )}
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
};

export default AuthLayout;
