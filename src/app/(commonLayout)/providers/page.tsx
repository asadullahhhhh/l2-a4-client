import { PaginationDemo } from "@/components/shared/pagination";
import { ProviderCard } from "@/modules/providers/providerCard";
import RootProviderPage from "@/modules/providers/RootProviderPage";
import { providerService } from "@/service/provider.service";
import { Provider } from "@/types/provider.type";

const ProviderPage = async () => {
  const { data } = await providerService.getAllProviders();
  const providers = data?.data?.data || [];
  const meta = data?.data?.meta || {
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  };


  return (
    <RootProviderPage providerService={providers} meta={meta} />
  );
};

export default ProviderPage;
