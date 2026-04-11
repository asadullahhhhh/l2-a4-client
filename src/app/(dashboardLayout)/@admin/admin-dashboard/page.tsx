import { redirect } from "next/navigation";

const AdminDashboardPage = () => {
    return redirect("/admin-dashboard/user-management")
}

export default AdminDashboardPage;