"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

const DocumentPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () =>{
    const promise = create({title: "Untitled"});

    toast.promise(promise, {
      loading: "Creating...",
      success: "Successfull",
      error: "Something went wrong. Try Again"

    })
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-10">
        <h3 className="font-semibold text-4xl">Welcome {user?.lastName}</h3>
        <p className="opacity-75">Nothing to see here yet...</p>
        <Button onClick={onCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          <span> Create</span>
        </Button>
      </div>
    </div>
  );
};

export default DocumentPage;
