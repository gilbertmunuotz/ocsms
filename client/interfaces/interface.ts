export interface VehicleCardProps {
    vehicle: {
        id: number;
        brand: string;
        model: string;
        year: number;
        price: number;
        mileage: number;
        fuel_type: string;
        transmission: string;
        condition: string;
        status: string;
        description: string;

        category: {
            id: number;
            category_name: string;
        };

        seller: {
            userId: number;
            business_name: string;
            location: string;
        };
        images: VehicleImage[];
    };
}

export interface Vehicle {
    id: number;
    sellerId: number;
    categoryId: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuel_type: string;
    transmission: string;
    condition: string;
    status: string;
    description: string;
    date_posted: string;

    category: {
        id: number;
        category_name: string;
    };

    seller: {
        userId: number;
        business_name: string;
        location: string;
    };
    images: VehicleImage[];
}

export interface VehicleImage {
  id: number;
  image_url: string;
}

export type VehicleFilterValues = {
  categoryId: string
  fuel_type: string
  transmission: string
  condition: string
  minPrice: string
  maxPrice: string
}

export type FiltersProps = {
  filters: VehicleFilterValues
  onChange: (filters: VehicleFilterValues) => void
}