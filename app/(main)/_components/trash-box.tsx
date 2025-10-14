"use client";

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "../../../components/modals/confirm-modals";

export const TrashBox: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filterDocuments = documents?.filter((document) => {
    return (
      document.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      document.content?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const onClick = (documentID: string) => {
    router.push(`/documents/${documentID}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentID: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentID });

    toast.promise(promise, {
      loading: "Restoring...",
      success: "Restored",
      error: "Something went wrong, please try again later",
    });
  };

  const onRemove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    documentID: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = remove({ id: documentID });

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Something went wrong, please try again later",
    });

    if (params?.documentID === documentID) {
      router.back();
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="text-sm">
        <div className="flex items-center gap-x-1 p-2">
          <Search className="h-4 w-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
            placeholder="filter by page title..."
          />
        </div>
        <div className="mt-2 px-1 pb-1">
          <div className="hidden last:block text-xs text-center text-muted-foreground pb-2">
            No document found
          </div>
          {filterDocuments?.map((document) => (
            <div
              className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
              role="button"
              onClick={() => onClick(document._id)}
              key={document._id}
            >
              <span className="truncate pl-2">{document.title}</span>
              <div className="flex items-center">
                <div
                  onClick={(e) => onRestore(e, document._id)}
                  className="rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Undo className="h-4 w-4 text-muted-foreground" />
                </div>
                <ConfirmModal onConfirm={(e)=>onRemove(e, document._id)}>
                  <div
                    className="rounded-sm p-2 hover:bg-neutral-200"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
