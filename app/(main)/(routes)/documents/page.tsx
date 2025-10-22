"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DocumentPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentID) => {
      router.push(`/documents/${documentID}`);
    });

    toast.promise(promise, {
      loading: "Creating...",
      success: "Successfull",
      error: "Something went wrong. Try Again",
    });
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-10">
        <h3 className="font-semibold text-4xl uppercase">
          Welcome {user?.username}
        </h3>
        <Button onClick={onCreate} className="group hover:cursor-pointer">
          <span> Create</span>
          <PlusCircle className="h-4 w-4 ml-2 transition group-hover:text-green-300" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentPage;
