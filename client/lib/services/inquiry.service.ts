import { InquiryRepository } from "../repositories/inquiry.repository";
import { InquiryEntity } from "../../types/inquiry";

export class InquiryService {
  static sendInquiry(
    vehicleId: string,
    buyerId: string,
    message: string
  ) {
    const inquiry: InquiryEntity = {
      id: crypto.randomUUID(),
      vehicleId,
      buyerId,
      message,
      createdAt: new Date().toISOString(),
    };

    InquiryRepository.create(inquiry);

    return inquiry;
  }
}
