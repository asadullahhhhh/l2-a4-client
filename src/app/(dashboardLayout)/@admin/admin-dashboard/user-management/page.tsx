import { UserManagementTable } from "@/modules/admin/userManagement";
import { AdminService } from "@/service/admin.service";
import { GetAllUsersParams } from "@/types/admin.types";

const UserManagement = async ({
  searchParams,
}: {
  searchParams: Promise<GetAllUsersParams>;
}) => {
  const { page, limit, status, role } = await searchParams;

  const { data: userData, error } = await AdminService.getAllUsers({
    page,
    limit,
    status,
    role,
  });
  const users = userData?.data?.data || [];
  const meta = userData?.data?.meta || {
    page: 1,
    totalPage: 1,
    limit: 10,
    totalItems: 0,
  };

  return (
    <div>
        <UserManagementTable users={users} meta={meta}></UserManagementTable>
    </div>
  );
};

export default UserManagement;
