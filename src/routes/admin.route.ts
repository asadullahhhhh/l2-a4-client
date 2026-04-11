import { AdminRoute } from "@/types/admin.types";

const adminRoutes: AdminRoute= {
    title: "Admin Controls",
    items: [
        {
            title: "User Management",
            url: "/admin-dashboard/user-management",
        },
        {
            title: "Order Management",
            url: "/admin-dashboard/order-management",
        },
        {
            title: "Create Category",
            url: "/admin-dashboard/create-category",
        }
    ]
}

export default adminRoutes;