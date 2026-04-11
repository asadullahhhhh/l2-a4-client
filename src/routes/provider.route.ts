import { AdminRoute } from "@/types/admin.types";
import adminRoutes from "./admin.route";

const providerRoutes: AdminRoute= {
    title: "Provider Controls",
    items: [
        {
            title: "User Management",
            url: "/provider-dashboard/user-management",
        },
        {
            title: "Order Management",
            url: "/provider-dashboard/order-management",
        },
        {
            title: "Create Category",
            url: "/provider-dashboard/create-category",
        }
    ]
}

export default providerRoutes;