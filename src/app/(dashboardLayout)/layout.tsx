import { AppSidebar } from "@/components/app-sidebar";
import { DropdownMenuIconsDashboard } from "@/components/provider/dashboard-dropdown";
import { ModeToggle } from "@/components/provider/theme-toggole";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { userService } from "@/service/user.service";
import { userRoles } from "@/types/role";

const DashboardLayout = async ({ admin, provider }: { admin: React.ReactNode; provider: React.ReactNode }) => {

    const session = await userService.getSession()
    const userRole = session?.data?.user?.role;

    const userImage =
    session.data?.user?.image ||
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

    return (
         <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />

          <div className="flex gap-4 items-center">
            <ModeToggle></ModeToggle>
            <DropdownMenuIconsDashboard image={userImage}></DropdownMenuIconsDashboard>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
         {
            userRole === userRoles.admin ? admin : provider
         }
        </div>
      </SidebarInset>
    </SidebarProvider>
    );
}


export default DashboardLayout;