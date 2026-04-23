import OrdersTablePage from "@/modules/order/orderTable";
import { orderService } from "@/service/order.service"

const OrdersPage = async () => {
    const {data} = await orderService.getUserOrders()

    const orders = data?.data || []
    
    return (
        <div className="min-h-[calc(100vh-436px)]">
            <OrdersTablePage orders={orders}></OrdersTablePage>
        </div>
    )
}

export default OrdersPage
