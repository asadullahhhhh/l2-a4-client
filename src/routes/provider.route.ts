import { AdminRoute } from "@/types/admin.types";

const providerRoutes: AdminRoute= {
    title: "Provider Controls",
    items: [
        {
            title: "Create Menu",
            url: "/provider-dashboard/create-menu",
        },
        {
            title: "Manage Menus",
            url: "/provider-dashboard/manage-menus",
        },
        {
            title: "Manage Orders",
            url: "/provider-dashboard/manage-orders",
        }
    ]
}

export default providerRoutes;