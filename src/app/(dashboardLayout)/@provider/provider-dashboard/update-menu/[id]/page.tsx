import UpdateMenuForm from "@/modules/providers/updateMenuForm";
import { menuService } from "@/service/menu.service";

const UpdateMenuPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    const mealData = await menuService.getMealById(id)
    const meal = mealData.data;

    return (
        <div >
            <UpdateMenuForm meal={meal} mealId={id}></UpdateMenuForm>
        </div>
    );
}

export default UpdateMenuPage;