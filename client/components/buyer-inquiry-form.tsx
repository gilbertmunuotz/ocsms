/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { sendInquiry } from "@/app/dashboard/buyer/_action";

type InquiryFormProps = {
  vehicleId: number;
  className?: string;
};

export function InquiryForm({ vehicleId, className }: InquiryFormProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // const formData = new FormData(e.currentTarget);
    // const message = formData.get("message") as string;

    try {
      setLoading(true);
      await sendInquiry(vehicleId, message);
      toast.success("Inquiry sent successfully");
      setMessage("");
    } catch (error: any) {
      toast.error(error.message || "Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("max-w-xl", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Contact Seller</CardTitle>
          <CardDescription>
            Send a message to the seller about this vehicle
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi, I'm interested in this vehicle. Is it still available?"
                  required
                  rows={4}
                />

              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
