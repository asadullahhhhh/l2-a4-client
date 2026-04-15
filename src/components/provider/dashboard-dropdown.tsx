"use client";

import {
  ShoppingCart,
  LogOutIcon,
  UserIcon,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function DropdownMenuIconsDashboard({
  image,
}: {
  image?: string;
}) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          className="h-7.5 w-7.5 rounded-full object-cover"
          src={image}
          alt=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"/"} className="flex gap-3 w-full">
            <UserIcon />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            await authClient.signOut();
            router.refresh();
          }}
        >
          <Link href={"/"} className="flex gap-2 items-center justify-center">
            <LogOutIcon />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
