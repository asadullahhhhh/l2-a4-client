import {
  ShoppingCart,
  LogOutIcon,
  UserIcon,
  CreditCard,
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

export function DropdownMenuIcons({ image }: { image?: string }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img className="h-7.5 w-7.5 rounded-full" src={image} alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"/profile"} className="flex gap-3 w-full">
            <UserIcon />
          Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/cart"} className="flex gap-3 w-full">
            <ShoppingCart></ShoppingCart>
            Cart
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/orders"} className="flex gap-3 w-full">
            <CreditCard />
            Orders
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
