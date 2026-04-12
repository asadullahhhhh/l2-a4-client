import AdminOrdersTable from "@/modules/admin/adminOrderTable";
import { AdminService } from "@/service/admin.service";

const OrderManagementPage = async ({searchParams}: {searchParams: Promise<{page: string}>}) => {
    const {page} = await searchParams;
    const { data, error } = await AdminService.getAllOrders({page})
    console.log(data.data.meta);

    const orders = data?.data?.data || [];
    const meta = data?.data?.meta || {
        page: 1,
        totalPage: 1,
        limit: 10,
        totalItems: 0,
    };
  return (
    <div>
     <AdminOrdersTable orders={orders} meta={meta}></AdminOrdersTable>
    </div>
  );
};

export default OrderManagementPage;
