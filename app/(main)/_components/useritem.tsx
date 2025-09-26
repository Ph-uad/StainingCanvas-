import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

import { ChevronsLeftRight } from "lucide-react";

export const UserItem: React.FC = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          role="button"
          className="flex item-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="fkex flex-col space-y-4 p-2">
          <p className="text-xs line-clamp-1">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <figure className="rounded-full h-10 w-10 overflow-hidden  bg-secondary">
              <Avatar className="">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </figure>
          <div className="space-y-1">
            <p className="text-sm line-clamp-1">
              {user?.fullName}&apos;s profile
            </p>
          </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="w-full cursor-pointer">
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
