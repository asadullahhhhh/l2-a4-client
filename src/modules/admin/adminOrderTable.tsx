"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PaginationDemo } from "@/components/shared/pagination";
import AdminOrdersTableSkeleton from "./orderSkeleton";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PLACED":
      return "bg-blue-100 text-blue-600";
    case "PROCESSING":
      return "bg-yellow-100 text-yellow-600";
    case "PREPARING":
      return "bg-purple-100 text-purple-600";
    case "READY":
      return "bg-indigo-100 text-indigo-600";
    case "DELIVERED":
      return "bg-green-100 text-green-600";
    case "CANCELLED":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function AdminOrdersTable({
  orders,
  meta,
}: {
  orders: any[];
  meta: any;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-150px)]">
      <div className="w-full mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Order Management</h1>

        {isPending ? (
          <AdminOrdersTableSkeleton></AdminOrdersTableSkeleton>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              {/* HEADER */}
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              {/* BODY */}
              <TableBody>
                {orders.map((order) => (
                  <>
                    {/* MAIN ROW */}
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        #{order.id.slice(0, 6)}
                      </TableCell>

                      <TableCell>
                        <Badge className={getStatusStyle(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>

                      <TableCell>${order.total_price}</TableCell>

                      <TableCell>
                        <span className="text-sm font-medium">
                          Cash on Delivery
                        </span>
                      </TableCell>

                      <TableCell className="max-w-[200px] truncate">
                        {order.delivery_address}
                      </TableCell>

                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggle(order.id)}
                        >
                          {openId === order.id ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* EXPANDED ITEMS */}
                    {openId === order.id && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="bg-muted/40 rounded-lg p-4 space-y-3">
                            <h3 className="font-semibold text-sm">
                              Order Items
                            </h3>

                            {order.orderItems.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between border rounded-md p-3"
                              >
                                {/* LEFT */}
                                <div className="flex items-center gap-3">
                                  <div className="relative w-14 h-14 rounded-md overflow-hidden">
                                    <Image
                                      src={
                                        item.image_url ||
                                        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                                      }
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>

                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>

                                {/* RIGHT */}
                                <div className="font-medium">
                                  $
                                  {(Number(item.price) * item.quantity).toFixed(
                                    2,
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* pagination */}
      <div>
        {meta.totalPage > 1 && (
          <PaginationDemo
            meta={meta}
            startTransition={startTransition}
          ></PaginationDemo>
        )}
      </div>
    </div>
  );
}
