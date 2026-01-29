import { SERVER_URI } from "@/constants/constant";
import { Vehicle } from "@/interfaces/interface";
import { auth } from "@/auth";
import BuyerVehicleDetails from "@/components/VehicleDetails";

async function getVehicle(id: string): Promise<Vehicle> {
  const res = await fetch(
    `${SERVER_URI}/api/v1/vehicle/vehicle/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch vehicle");

  const data = await res.json();
  return data.vehicle;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  const { id } = await params;

  const vehicle = await getVehicle(id);

  return (
    <BuyerVehicleDetails
      vehicle={vehicle}
      isAuthenticated={!!session}
    />
  );
}
