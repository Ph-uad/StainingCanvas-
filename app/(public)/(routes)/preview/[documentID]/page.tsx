"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import { useMutation, useQuery } from "convex/react";

import { Cover } from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface DocumentIDPageProps {
  documentID: Id<"documents">;
}
const DocumentIDPage = ({ documentID }: DocumentIDPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const params = useParams();
  const update = useMutation(api.documents.update);
  const document = useQuery(api.documents.getByID, {
    documentID: params.documentID as Id<"documents">,
  });

  if (document === undefined)
    return (
      <div>
        <Cover.Skeleton />{" "}
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-8">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    );

  if (document === null) return <p>Document not found</p>;

  const onChange = (content: string) => {
    update({ id: params.documentID as Id<"documents">, content });
  };

  return (
    <div className="pb-40 overflow-y-hideden">
      <Cover url={document.coverImage} preview />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} preview />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};
export default DocumentIDPage;
