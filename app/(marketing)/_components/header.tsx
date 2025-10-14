"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useTheme } from "next-themes"; 

export function EditableHeader() {
  
  const { resolvedTheme } = useTheme();
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        props: {
          level: 1,
        },
        content: "Write yours here",
      },
      {
        type: "heading",
        props: {
          level: 2,
        },
        content: "With US",
      },
    ],
  });

  return (
    <div className="rounded-lg w-fit h-fit pb-[45vh]">
      <BlockNoteView
        editor={editor}
        className="text-green-500"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}
