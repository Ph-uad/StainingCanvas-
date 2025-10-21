"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "../../../components/modals/confirm-modals";
import { Trash, Undo2 } from "lucide-react";

interface BannerProps {
  documentID: Id<"documents">;
}

export const Banner = ({ documentID }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    router.push("/documents");
    const promise = remove({ id: documentID });

    toast.promise(promise, {
      loading: "Removing...",
      success: "Deleted",
      error: "Something went wrong. Try Again",
    });
  };

  const onRestore = () => {
    const promise = restore({ id: documentID });

    toast.promise(promise, {
      loading: "Restoring...",
      success: "Restored",
      error: "Something went wrong. Try Again",
    });
  };

  return (
    <div className="w-full bg-rose-500/90 text-center text-sm text-white flex items-center gap-x-2 justify-center p-2">
      <p>this page is in the trash </p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        <Undo2 className="mr-1 h-4 w-4" />
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          role="button"
          size="sm"
          variant="destructive"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          <Trash className="mr-1 h-4 w-4" />
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
