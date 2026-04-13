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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/actions/provider.action";
import { PaginationDemo } from "@/components/shared/pagination";
import OrderManagementSkeleton from "./orderTableSkeleton";

const statusOptions = ["PLACED", "PROCESSING", "DELIVERED", "CANCELLED"];

// ================= COMPONENT =================
export default function OrderManagementTable({
  data,
  meta,
}: {
  data: any[];
  meta: any;
}) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  console.log(meta);

  const handleOpen = (order: any) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setOpen(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const taostId = toast.loading("Updating order status...");
    try {
      const { data, error } = await updateOrderStatus(selectedOrder.id, {
        status: status,
      });

      if (data) {
        toast.success("Order status updated successfully", { id: taostId });
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        return;
      }

      toast.error(error?.message || "Failed to update order status", {
        id: taostId,
      });
      setIsLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update order status", { id: taostId });
      setIsLoading(false);
      setOpen(false);
    }

    setOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      <div className="flex flex-col justify-between min-h-[calc(100vh-200px)]">
        {isPending ? (
          <OrderManagementSkeleton></OrderManagementSkeleton>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id.slice(0, 8)}...
                    </TableCell>

                    <TableCell>
                      {order.orderItems.map((item: any, i: number) => (
                        <div key={i} className="text-sm">
                          {item.name} x {item.quantity}
                        </div>
                      ))}
                    </TableCell>

                    <TableCell>৳ {order.total_price}</TableCell>

                    <TableCell>{order.status}</TableCell>

                    <TableCell className="max-w-[200px] truncate">
                      {order.delivery_address}
                    </TableCell>

                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleOpen(order)}>
                        Update Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div>
          <PaginationDemo meta={meta} startTransition={startTransition} />
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
