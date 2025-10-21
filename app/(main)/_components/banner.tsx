"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "../../../components/modals/confirm-modals";

interface BannerProps {
  documentID: Id<"documents">;
}

export const Banner = ({ documentID }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentID })
      .then(() => router.push("/documents"));
    

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
    <div className="w-full bg-rose-500 text-center text-sm text-white flex items-center gap-x-2 justify-center p-2">
      <p>this page is in the trash </p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          {" "}
          Delete Forever{" "}
        </Button>
      </ConfirmModal>
    </div>
  );
};
