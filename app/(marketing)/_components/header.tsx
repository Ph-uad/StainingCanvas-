"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
// import "@blocknote/mantine/style.css";

export function EditableHeader() {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        props: {
          level: 1,
        },
        content: "Welcome to this demo!",
      },
      {
        type: "heading",
        props: {
          level: 2,
        },
        content: "Open up a menu or toolbar to see more of the red theme",
      },
      {
        type: "heading",
        props: {
          level: 3,
        },
        content:
          "Toggle light/dark mode in the page footer and see the theme change too",
      },
      {
        type: "paragraph",
      },
    ],
  });

  return (
    <div className="bg-muted-foreground rounded-lg w-11/12 h-fit py-3">
      <BlockNoteView editor={editor} />
    </div>
  );
}
