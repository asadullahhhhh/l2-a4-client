import CategoryTable from "@/modules/admin/categorymanagementTable";
import { menuService } from "@/service/menu.service"

const ManageCategoryPage = async () => {

    const {data} = await menuService.getCategories()

    return (
        <div>
            <CategoryTable data={data}></CategoryTable>
        </div>
    )
}

export default ManageCategoryPage;