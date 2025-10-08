"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverimage = useCoverImage();
  const removeImageCover = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (!url) return;
    await edgestore.publicFiles.delete({ url });
    removeImageCover({ id: params.documentID as Id<"documents"> });
  };

  return (
    <>
      <div
        className={cn(
          "w-full relative group h-[38vh]",
          !url && "h-[12vh]",
          url && "bg-muted"
        )}
      >
        {!!url &&  (
          <Image
            src={url}
            alt="Cover Image"
            fill
            className="object-cover w-full h-full"
          />
        )}
        {url && !preview && (
          <div className="opacity-0 group-hover:opacity-100 transition absolute bottom-5 right-5 flex items-center gap-x-2">
            <Button
              variant="outline"
              className="text-muted-foreground"
              onClick={() => coverimage.onReplace(url)}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>Change Image</span>
            </Button>
            <Button
              variant="outline"
              className="text-muted-foreground"
              onClick={onRemove}
            >
              <X className="mr-2 h-4 w-4" />
              <span>Remove Image</span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <div className="h-[12vh] w-full bg-muted animate-pulse"></div>;
};
