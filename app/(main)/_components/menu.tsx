import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react"; 
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

interface MenuProps {
  documentID?: Id<"documents">;
}

const Menu = ({ documentID }: MenuProps) => {
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentID! });

    toast.promise(promise, {
      loading: "Trashing...",
      success: "Moved to trash!",
      error: "Something went wrong. Try Again",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onSelect={onArchive} className="w-full flex items-center justify-start">
          {/* <button onClick={onArchive} className="w-full flex items-center justify-start"> */}
            <Trash className="h-4 w-4 mr-2" />
            Delete
          {/* </button> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground px-2 py-1">
          @{user?.username}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-8 w-8 rounded-md" />;
};
