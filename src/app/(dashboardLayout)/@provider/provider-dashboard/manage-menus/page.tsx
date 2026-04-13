import ManageMealsTable from "@/modules/providers/menuTable";
import { menuService } from "@/service/menu.service"

const ManageMenusPage = async ({searchParams}: {searchParams: Promise<{page?: string}>}) => {
    const {page} = await searchParams

    const {data, error}= await menuService.getProviderMenus({page})
    const menus = data?.data?.data || [];
    const meta = data?.data?.meta || {
        totalPage: 0,
        page: 1,
        limit: 12,
        totalItems: 0
    };

    return (
        <div>
            <ManageMealsTable data={menus} meta={meta}></ManageMealsTable>
        </div>
    )
}

export default ManageMenusPage