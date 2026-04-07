"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Package, PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage({ orders }: { orders: any[] }) {
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenOrder((prev) => (prev === id ? null : id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-blue-100 text-blue-600";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-600";

      case "PREPARING":
        return "bg-orange-100 text-orange-600";

      case "READY":
        return "bg-purple-100 text-purple-600";

      case "DELIVERED":
        return "bg-green-100 text-green-600";

      case "CANCELLED":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return orders.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
      {/* ICON */}
      <div className="bg-muted p-6 rounded-full">
        <PackageSearch className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* TEXT */}
      <h2 className="text-2xl font-semibold">No Orders Found</h2>

      <p className="text-sm text-muted-foreground max-w-sm">
        Looks like you haven't placed any orders yet. Start exploring delicious
        meals now!
      </p>

      {/* ACTION BUTTON */}
      <Link href="/meals">
        <Button className="mt-3">Browse Meals</Button>
      </Link>
    </div>
  ) : (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Package className="w-6 h-6" />
        Your Orders
      </h1>

      {/* TABLE */}
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead> {/* ✅ NEW */}
              <TableHead>Address</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <>
                {/* 🔥 ORDER ROW */}
                <TableRow key={order.id}>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggle(order.id)}
                    >
                      {openOrder === order.id ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </TableCell>

                  <TableCell className="font-medium">
                    {order.id.slice(0, 8)}...
                  </TableCell>

                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>

                  <TableCell>${order.total_price}</TableCell>

                  {/* ✅ PAYMENT COLUMN */}
                  <TableCell>
                    <Badge variant="secondary">Cash on Delivery</Badge>
                  </TableCell>

                  <TableCell className="max-w-[200px] truncate">
                    {order.delivery_address}
                  </TableCell>

                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>

                {/* 🔥 EXPANDED ORDER ITEMS */}
                {openOrder === order.id && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="bg-muted/40 p-4 rounded-lg space-y-3">
                        <h3 className="font-semibold">Order Items</h3>

                        {order.orderItems.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center border-b pb-3 gap-4"
                          >
                            {/* LEFT: IMAGE + NAME */}
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-md overflow-hidden">
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

                            {/* RIGHT: PRICE */}
                            <div className="font-semibold">
                              ${Number(item.price).toFixed(2)}
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
      </Card>
    </div>
  );
}
