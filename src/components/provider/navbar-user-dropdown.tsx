import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DropdownMenuIcons({image}: {image?: string}) {

    const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img className="h-7.5 w-7.5 rounded-full" src={image} alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/menus"} className="flex gap-2">
          <SettingsIcon />
          Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={async () => {
            await authClient.signOut()
            router.refresh()
        }}>
          <Link href={"/"} className="flex gap-2 items-center justify-center">
          <LogOutIcon />
          Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
