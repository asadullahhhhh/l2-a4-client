import { PaginationDemo } from "@/components/shared/pagination";
import { ProviderCard } from "@/modules/providers/providerCard";
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
    <div className="max-w-6xl mx-auto px-5">
      <div>
        <div className="flex gap-3 flex-col mx-auto md:flex-row items-start mb-10">
          {providers.map((provider: Provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
        <div>
          {
            meta.totalPages > 1 && <PaginationDemo meta={meta} />
          }
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
