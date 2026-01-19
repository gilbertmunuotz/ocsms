import inquiriesData from "../data/inquiries.json";
import { InquiryEntity } from "../../types/inquiry";

const inquiries: InquiryEntity[] = inquiriesData as InquiryEntity[];

export class InquiryRepository {
  static findAll(): InquiryEntity[] {
    return inquiries;
  }

  static findByVehicle(vehicleId: string): InquiryEntity[] {
    return inquiries.filter((i) => i.vehicleId === vehicleId);
  }

  static findByBuyer(buyerId: string): InquiryEntity[] {
    return inquiries.filter((i) => i.buyerId === buyerId);
  }

  static create(inquiry: InquiryEntity) {
    inquiries.push(inquiry);
  }
}
