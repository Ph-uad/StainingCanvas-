"use client";

import { WordRotate } from "@/components/ui/word-rotate";

export const Campaign = () => {
  const keywords: string[] = [
    "History is filled with",
    "Religion was preserved with",
    "literary art is expressed",
    "Laws consist of",
    "Famous Quotes are",
  ];

  return (
    <>
      <div className="text-9xl">
        {/* <h2>It is Just Words</h2> */}
        <h3 className="flex justify-center gap-x-2 items-end">
          <em>
            <WordRotate
              words={[...keywords]}
              className="verflow-visible text-4xl"
              duration={8000}
            />
          </em>
           words
        </h3>
        <h3>Write yours</h3>
      </div>
    </>
  );
};

// Huge fonts
// Typing words in the kewords array at intervals
//  After the animation is done
// Let the words "It is just words, Literally Stain The ******** Canvas"
