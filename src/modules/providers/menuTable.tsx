"use client";

import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { PaginationDemo } from "@/components/shared/pagination";
import MealsTableSkeleton from "./manageMenuSkeleton";
import { toast } from "sonner";
import { deleteMenuProvider } from "@/actions/provider.action";

// ================= TYPES =================
type Meal = {
  id: string;
  name: string;
  description: string;
  price: string;
  is_available: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_halal: boolean;
  is_gluten_free: boolean;
  is_feature: boolean;
};

// ================= COMPONENT =================
export default function ManageMealsTable({
  data,
  meta,
}: {
  data: Meal[];
  meta: { totalItems: number; page: number; limit: number; totalPage: number };
}) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const confirmDelete = async() => {
    const taostId = toast.loading("Deleting the meal...");
    try {
      const {data, error} = await deleteMenuProvider(selectedId as string);

      if(data){
        toast.success("Meal deleted successfully!", { id: taostId });
        router.refresh();
        setOpen(false);
        return
      }
    } catch (error) {
      toast.error("Failed to delete the meal.", { id: taostId });
    } finally{
      setOpen(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Meals</h1>

      <div className="flex flex-col justify-between min-h-[calc(100vh-250px)]">
        {isPending ? (
          <MealsTableSkeleton></MealsTableSkeleton>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Feature</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell className="font-medium">{meal.name}</TableCell>

                    <TableCell className="max-w-[250px] truncate">
                      {meal.description}
                    </TableCell>

                    <TableCell>৳ {meal.price}</TableCell>

                    <TableCell>
                      {meal.is_available ? "Available" : "Unavailable"}
                    </TableCell>

                    <TableCell>{meal.is_feature ? "Yes" : "No"}</TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/provider-dashboard/update-menu/${meal.id}`,
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(meal.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div>
          {meta.totalPage > 1 && (
            <PaginationDemo
              meta={meta}
              startTransition={startTransition}
            ></PaginationDemo>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete the meal.
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
