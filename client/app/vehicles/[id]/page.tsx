import { SERVER_URI } from "@/constants/constant";
import { Vehicle } from "@/interfaces/interface";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";

async function getVehicle(id: string): Promise<Vehicle> {
    const res = await fetch(
        `${SERVER_URI}/api/v1/vehicle/vehicle/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch vehicle");
    }

    const data = await res.json();
    return data.vehicle;
}

export default async function Page({ params, }: { params: Promise<{ id: string }>; }) {

    const session = await auth();
    const { id } = await params;
    const vehicle = await getVehicle(id);

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

            {/* Main section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="h-80 bg-zinc-800 rounded-sm flex items-center justify-center">
                    {vehicle.images?.length > 0 ? (
                        <Image
                            src={`${SERVER_URI}${vehicle.images[0].image_url}`}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover rounded-sm"
                        />
                    ) : (
                        <span className="text-zinc-400">No image available</span>
                    )}
                </div>

                {/* Specs */}
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

            {/* Description */}
            <section>
                <h2 className="text-xl font-semibold mb-2">
                    Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {vehicle.description || "No description provided."}
                </p>
            </section>

            {/* Seller Info */}
            <section className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-2">
                    Seller Information
                </h2>
                <p className="text-muted-foreground">
                    {vehicle.seller.business_name}
                </p>
                <p className="text-muted-foreground">
                    <MapPin className="inline w-4 h-4 mr-1" /> {vehicle.seller.location}
                </p>
            </section>

            {/* CTA */}
            <div className="flex justify-end">
                {session ? (
                    <button className="bg-red-600 text-white px-6 py-2 rounded-sm">
                        <Link href={"/contact-seller"}>
                            Contact Seller
                        </Link>
                    </button>
                ) : (
                    <Link href="/auth/login">
                        Login to contact seller
                    </Link>
                )}
            </div>
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
