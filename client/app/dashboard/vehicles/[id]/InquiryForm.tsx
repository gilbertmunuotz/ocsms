"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { InquiryService } from "@/lib/services/inquiry.service";

export default function InquiryForm({
  vehicleId,
}: {
  vehicleId: string;
}) {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!session || session.user.role !== "buyer") return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!session) return;

    InquiryService.sendInquiry(
      vehicleId,
      session.user.id,
      message
    );

    setSent(true);
    setMessage("");
  }

  if (sent) {
    return (
      <p className="mt-4 text-green-600">
        Inquiry sent successfully.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-2">
      <textarea
        className="border p-2 w-full"
        placeholder="Write your inquiry..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button className="bg-black text-white px-4 py-2">
        Send Inquiry
      </button>
    </form>
  );
}
