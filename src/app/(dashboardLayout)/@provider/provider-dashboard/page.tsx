import { providerService } from "@/service/provider.service";
import { redirect } from "next/navigation";

const ProviderDashboardPage = async () => {

    const {data, error} = await providerService.getProviderData()
    const isProvider = data?.data ? true : false;

    console.log(isProvider);

    if(isProvider) {
        return redirect("/provider-dashboard/create-menu")
    }

    return redirect("/config-provider-profile")

}

export default ProviderDashboardPage;