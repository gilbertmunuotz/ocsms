"use client";

import { useSession } from "next-auth/react";
import { VehicleRepository } from "@/lib/repositories/vehicle.repository";
import { InquiryRepository } from "@/lib/repositories/inquiry.repository";

export default function SellerInquiriesPage() {
  const { data: session } = useSession();

  if (!session || session.user.role !== "seller") {
    return <p>Access denied</p>;
  }

  const sellerVehicles = VehicleRepository.findBySeller(
    session.user.id
  );

  const inquiries = sellerVehicles.flatMap((v) =>
    InquiryRepository.findByVehicle(v.id)
  );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Vehicle Inquiries
      </h1>

      {inquiries.length === 0 && <p>No inquiries yet.</p>}

      <ul className="space-y-3">
        {inquiries.map((i) => (
          <li key={i.id} className="border p-3 rounded">
            <p className="text-sm text-gray-500">
              Vehicle ID: {i.vehicleId}
            </p>
            <p>{i.message}</p>
            <p className="text-xs text-gray-400">
              {new Date(i.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
