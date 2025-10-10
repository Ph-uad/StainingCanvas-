"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/usse-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmittting] = useState(false);

  const onPublish = () => {
    setIsSubmittting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmittting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Successfull",
      error: "Something went wrong. Try again ",
    });
  };

  const onUnPublish = () => {
    setIsSubmittting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmittting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Successfull",
      error: "Something went wrong. Try again ",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const url = `${origin}/preview/${initialData._id}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="hover:cursor-pointer">
          <h2>Publish </h2>
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4 ">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              className="hover:cursor-pointer w-full text-x bg-accent"
              size={"sm"}
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="hover:cursor-pointer flex flex-col items-center justify-center">
            <div className="flex gap-x-2 items-center justify-center">
              <div className="">
                <Globe className="h-8 w-8 text-muted-foreground mb-2" />
              </div>
              <span>Make {initialData.title} public</span>
            </div>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-sm"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
