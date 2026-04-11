"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AdminRoute } from "@/types/admin.types";
import { userRoles } from "@/types/role";
import adminRoutes from "@/routes/admin.route";
import providerRoutes from "@/routes/provider.route";
import Link from "next/link";

export function AppSidebar({
   userRole, ...props
 
}: React.ComponentProps<typeof Sidebar> & { userRole: string | undefined }) {
  // This is sample data.
  let routes: AdminRoute[] = [];

  switch (userRole) {
    case userRoles.admin:
      routes.push(adminRoutes);
      break;

    case userRoles.provider:
      routes.push(providerRoutes);
      break;

    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h2 className="py-5 font-semibold text-xl">Admin Controls</h2>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
