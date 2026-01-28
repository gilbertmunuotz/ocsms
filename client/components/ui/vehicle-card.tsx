import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VehicleCardProps } from '@/interfaces/interface';
import { SERVER_URI } from "@/constants/constant";
import { MapPin } from "lucide-react";


export default function VehicleCard({ vehicle }: VehicleCardProps) {
    const imagePath = vehicle.images?.[0]?.image_url;

    const imageUrl = imagePath
        ? `${SERVER_URI}${imagePath}`
        : "/cars.jpg";

    return (
        <Card className="hover:shadow-lg transition-shadow">

            {/* Vehicle Image */}
            <div className="relative w-full h-48 bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>
                        {vehicle.brand} {vehicle.model}
                    </span>
                    <Badge variant="secondary">{vehicle.status}</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    {vehicle.year} • {vehicle.transmission}
                </p>
            </CardHeader>

            <CardContent className="space-y-2">
                <p className="text-lg font-semibold text-primary">
                    ${vehicle.price.toLocaleString()}
                </p>

                <div className="text-sm text-muted-foreground">
                    <p>Fuel: {vehicle.fuel_type}</p>
                    <p>Mileage: {vehicle.mileage.toLocaleString()} km</p>
                    <p>Condition: {vehicle.condition}</p>
                    <p>Category: {vehicle.category?.category_name}</p>
                </div>

                <p className="text-sm line-clamp-3">
                    {vehicle.description}
                </p>
            </CardContent>

            <CardFooter className="flex justify-between">
                <span className="text-xs text-muted-foreground">
                    Seller: {vehicle.seller?.business_name ?? "Verified Seller"}
                    <p className="text-lg"><MapPin className="inline w-4 h-4 mr-1" />{vehicle.seller.location}</p>
                </span>
                <Button size="sm" asChild>
                    <Link href={`/vehicles/${vehicle.id}`}>
                        View Details
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
