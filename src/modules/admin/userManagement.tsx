"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationMetaData, User } from "@/types/admin.types";
import { PaginationDemo } from "@/components/shared/pagination";
import { useTransition } from "react";
import { UserTableSkeleton } from "./userManagementSkeleton";
import { SelectDemo } from "../meals/selectCategory";
import { SearchX } from "lucide-react";
import { toast } from "sonner";
import { updateUserData } from "@/actions/admin.action";
import { useRouter } from "next/navigation";

export function UserManagementTable({
  users,
  meta,
}: {
  users: User[];
  meta: PaginationMetaData;
}) {
  const router = useRouter()
  const categoriesStatus = [
    { id: "All", name: "All" },
    { id: "ACTIVE", name: "Active" },
    { id: "SUSPENDED", name: "Suspended" },
  ];

  const categoriesRole = [
    { id: "All", name: "All" },
    { id: "PROVIDER", name: "Provider" },
    { id: "USER", name: "User" },
  ];

  const handelSuspend = async (userId: string) => {
    const toastId = toast.loading("Updating user data...");
    try {
      const {data} = await updateUserData({
        status: "SUSPENDED",
        userId: userId
      })

      if(data.success) {
        toast.success("User suspended successfully.", { id: toastId });
        router.refresh()
        return
      }

      toast.error("Failed to suspend user.", { id: toastId });
    } catch (error) {
      toast.error("Failed to suspend user.", { id: toastId });
    }
  }

  const handdelActive = async (userId: string) => {
     const toastId = toast.loading("Updating user data...");
    try {
      const {data} = await updateUserData({
        status: "ACTIVE",
        userId: userId
      })

      if(data.success) {
        toast.success("User activated successfully.", { id: toastId });
        router.refresh()
        return
      }

      toast.error("Failed to activate user.", { id: toastId });
    } catch (error) {
      toast.error("Failed to activate user.", { id: toastId });
    }
  }

  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <div className="flex justify-center mb-1 gap-5">
        <SelectDemo
          categories={categoriesStatus}
          startTransition={startTransition}
          ctName="Select status"
          paramName="status"
        ></SelectDemo>

        <SelectDemo
          categories={categoriesRole}
          startTransition={startTransition}
          ctName="Select role"
          paramName="role"
        ></SelectDemo>
      </div>
      <div>
        {isPending ? (
          <UserTableSkeleton></UserTableSkeleton>
        ) : (
          <div>
            {users.length > 0 ? (
              <div className="p-6">
                <div className="flex flex-col justify-between min-h-[calc(100vh-170px)]">
                  <div className="rounded-xl border shadow-sm bg-background">
                    <Table>
                      {/* HEADER */}
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>

                      {/* BODY */}
                      <TableBody>
                        {users.map((user) => {
                          const isActive = user.status === "ACTIVE";

                          return (
                            <TableRow
                              key={user.id}
                              className="hover:bg-muted/40 transition"
                            >
                              {/* USER */}
                              <TableCell className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                  <Image
                                    src={
                                      user.image ||
                                      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                                    }
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {user.email}
                                  </p>
                                </div>
                              </TableCell>

                              {/* ROLE */}
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className="capitalize"
                                >
                                  {user.role.toLowerCase()}
                                </Badge>
                              </TableCell>

                              {/* STATUS */}
                              <TableCell>
                                <Badge
                                  className={
                                    isActive
                                      ? "bg-green-100 text-green-600"
                                      : "bg-red-100 text-red-600"
                                  }
                                >
                                  {isActive ? "Active" : "Suspended"}
                                </Badge>
                              </TableCell>

                              {/* CREATED */}
                              <TableCell className="text-muted-foreground">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </TableCell>

                              {/* ACTION */}
                              <TableCell className="text-right">
                                {user.role !== "ADMIN" &&
                                  (isActive ? (
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() =>
                                        handelSuspend(user.id)
                                      }
                                    >
                                      Suspend
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="default"
                                      onClick={() =>
                                        handdelActive(user.id)
                                      }
                                    >
                                      Activate
                                    </Button>
                                  ))}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div>
                    <PaginationDemo
                      meta={meta}
                      startTransition={startTransition}
                    ></PaginationDemo>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 space-y-6">
                {/* ICON */}
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-muted">
                  <SearchX className="h-8 w-8 text-muted-foreground" />
                </div>

                {/* TEXT */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">No matching users</h2>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    No users match your current filters. Try adjusting or
                    clearing them.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
