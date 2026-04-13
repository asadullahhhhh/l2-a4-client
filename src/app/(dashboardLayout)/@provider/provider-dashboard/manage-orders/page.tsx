import OrderManagementTable from "@/modules/providers/manageOrder";
import { menuService } from "@/service/menu.service";

const ManageOrdersPage = async ({searchParams}: {searchParams: Promise<{page?: string}>}) => {
    const {page} = await searchParams;

    const {data, error} = await menuService.getProviderOrders({page});

    return (
        <div>
            <OrderManagementTable data={data?.data?.data || []} meta={data?.data?.meta || {}} />
        </div>
    )
}

export default ManageOrdersPage;