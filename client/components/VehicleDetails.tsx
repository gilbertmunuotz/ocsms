"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Vehicle } from "@/interfaces/interface";
import { SERVER_URI } from "@/constants/constant";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sendInquiry } from "@/app/dashboard/buyer/_action";
import Link from "next/link";

type Props = {
  vehicle: Vehicle;
  isAuthenticated: boolean;
};

export default function BuyerVehicleDetails({ vehicle, isAuthenticated }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold">
          {vehicle.brand} {vehicle.model}
        </h1>
        <p className="text-muted-foreground">
          {vehicle.category.category_name} • {vehicle.transmission} • {vehicle.fuel_type}
        </p>
      </header>

      {/* Image + Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative bg-zinc-800 rounded-sm h-[320px] md:h-[420px]">
          {vehicle.images?.length ? (
            <Image
              src={`${SERVER_URI}${vehicle.images[0].image_url}`}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover rounded-sm"
              unoptimized
            />
          ) : (
            <span className="text-zinc-400">No image available</span>
          )}
        </div>


        <div className="space-y-4">
          <Spec label="Price" value={`$${vehicle.price.toLocaleString()}`} />
          <Spec label="Year" value={vehicle.year.toString()} />
          <Spec label="Mileage" value={`${vehicle.mileage.toLocaleString()} km`} />
          <Spec label="Fuel Type" value={vehicle.fuel_type} />
          <Spec label="Transmission" value={vehicle.transmission} />
          <Spec label="Condition" value={vehicle.condition} />
          <Spec label="Status" value={vehicle.status} />
        </div>
      </div>

      {/* Seller */}
      <section className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">Seller Information</h2>
        <p>{vehicle.seller.business_name}</p>
        <p>
          <MapPin className="inline w-4 h-4 mr-1" />
          {vehicle.seller.location}
        </p>
      </section>

      {/* CTA */}
      <div className="flex justify-end">
        {isAuthenticated ? (
          <Button onClick={() => setOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">Contact Seller</Button>
        ) : (
          <Link href="/auth/login">Login to contact seller</Link>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Seller</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!message.trim()) {
                toast.error("Message is required");
                return;
              }

              try {
                setLoading(true);
                await sendInquiry(vehicle.id, message);
                toast.success("Inquiry sent");
                setOpen(false);
                setMessage("");
              } catch (err) {
                if (err instanceof Error) {
                  toast.error(err.message);
                } else {
                  toast.error("Failed to send inquiry");
                }
              } finally {
                setLoading(false);
              }
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label>Message</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Inquiry"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}