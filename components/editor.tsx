"use client";

import { useTheme } from "next-themes";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { PartialBlock } from "@blocknote/core"; 
import { useEdgeStore } from "@/lib/edgestore";
// import "@blocknote/shadcn/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {

  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleFileUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleFileUpload,
  });

  useEditorChange((editor) => {
    const savedBlocks = editor.document;
    onChange(JSON.stringify(savedBlocks, null, 2));
  }, editor);

  return (
    <div className="mt-10 mb-20 overflow-y-hidden">
      <BlockNoteView
        className="bg-transparent"
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable = {editable}
      />
    </div>
  );
};

export default Editor;
