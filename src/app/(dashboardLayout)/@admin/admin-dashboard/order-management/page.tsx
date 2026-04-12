import { AdminService } from "@/service/admin.service";

const OrderManagementPage = async () => {
    const { data, error } = await AdminService.getAllOrders()

    console.log(data);
  return (
    <div>
      <h1>Order Management</h1>
      {/* Order management content */}
    </div>
  );
};

export default OrderManagementPage;
