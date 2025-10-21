"use client";

import { WordRotate } from "@/components/ui/word-rotate";

export const Campaign = () => {
  const keywords: string[] = [
    "Write",
    "Publish",
    "Share",
    "Collaborate",
    "Organize",
    "Inspire",
    "Create",
    "Edit",
    "Brainstorm",
    "Draft",
    "Review",
    "Plan",
    "Document", 
    "Ideate",
    "Compose",
    "Express",
    "Narrate",
    "Craft",
    "Develop",
    "Design",
    "Strategize",
    "Outline",
    "Summarize",
  ];

  return (
    <>
      <div className="text-9xl">
        {/* <h2>It is Just Words</h2> */}
        <h3 className="flex justify-center gap-x-2 items-end ">
          <em>
            <WordRotate
              words={[...keywords]}
              className=" text-2xl border border-accent-foreground/10 px-2 py-1 rounded-md"
              duration={2000}
            />
          </em>
          Here
        </h3>
      </div>
    </>
  );
};

// Huge fonts
// Typing words in the kewords array at intervals
//  After the animation is done
// Let the words "It is just words, Literally Stain The ******** Canvas"
