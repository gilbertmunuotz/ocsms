import vehicles from "../data/vehicles.json";
import { VehicleEntity } from "../../types/vehicle";

export class VehicleRepository {
  static findAll(): VehicleEntity[] {
    return vehicles;
  }

  static findById(id: string): VehicleEntity | undefined {
    return vehicles.find((v) => v.id === id);
  }

  static findBySeller(sellerId: string): VehicleEntity[] {
    return vehicles.filter((v) => v.sellerId === sellerId);
  }

  static search(params: {
    brand?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
  }): VehicleEntity[] {
    return vehicles.filter((v) => {
      if (params.brand && v.brand !== params.brand) return false;
      if (params.location && v.location !== params.location) return false;
      if (params.minPrice && v.price < params.minPrice) return false;
      if (params.maxPrice && v.price > params.maxPrice) return false;
      return true;
    });
  }
}
