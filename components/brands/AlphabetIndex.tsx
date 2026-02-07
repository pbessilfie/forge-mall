"use client";

import React from "react";
import { cn } from "@/lib/utils";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetIndexProps {
  availableLetters: string[];
  activeLetter: string | null;
  onLetterClick: (letter: string | null) => void;
  className?: string;
}

const AlphabetIndex: React.FC<AlphabetIndexProps> = ({
  availableLetters,
  activeLetter,
  onLetterClick,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-1 md:gap-1.5", className)}>
      {/* All button */}
      <button
        onClick={() => onLetterClick(null)}
        className={cn(
          "w-8 h-8 md:w-9 md:h-9 rounded-lg text-sm font-medium transition-all duration-150",
          activeLetter === null
            ? "bg-black text-white"
            : "bg-transparent text-black/60 hover:bg-black/5 hover:text-black"
        )}
      >
        All
      </button>

      {/* Letter buttons */}
      {ALPHABET.map((letter) => {
        const isAvailable = availableLetters.includes(letter);
        const isActive = activeLetter === letter;

        return (
          <button
            key={letter}
            onClick={() => isAvailable && onLetterClick(letter)}
            disabled={!isAvailable}
            className={cn(
              "w-8 h-8 md:w-9 md:h-9 rounded-lg text-sm font-medium transition-all duration-150",
              isActive
                ? "bg-black text-white"
                : isAvailable
                ? "bg-transparent text-black/60 hover:bg-black/5 hover:text-black"
                : "bg-transparent text-black/20 cursor-not-allowed"
            )}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default AlphabetIndex;
