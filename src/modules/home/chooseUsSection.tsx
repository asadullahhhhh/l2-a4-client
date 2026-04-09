"use client";

import { Card } from "@/components/ui/card";
import { Truck, ShieldCheck, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your food delivered quickly and fresh right to your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "We ensure top quality meals from trusted providers.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description: "We value your time with reliable and punctual delivery.",
  },
  {
    icon: CreditCard,
    title: "Easy Payment",
    description: "Multiple payment options including cash on delivery.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-6xl mx-auto px-6">
      
      {/* 🔥 Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          We provide the best food delivery experience with speed, quality, and convenience.
        </p>
      </div>

      {/* 🔥 Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition duration-300 border"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg">{item.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mt-2">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}