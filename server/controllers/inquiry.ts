import { Request, Response, NextFunction } from "express";
import prisma from "../services/prisma";
import HttpStatusCodes from "../constants/HttpStatusCodes";

export async function createInquiry(req: Request, res: Response, next: NextFunction) {
  const user = req.user!;
  const { vehicleId, message } = req.body;

  try {
    if (!vehicleId || !message) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Vehicle ID and message are required",
      });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        buyerId: user.id,
        vehicleId: Number(vehicleId),
        message,
      },
    });

    return res.status(HttpStatusCodes.CREATED).json({
      message: "Inquiry sent successfully",
      inquiry,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSellerInbox(req: Request, res: Response, next: NextFunction) {
  
  const seller = req.user!; // authenticated seller

  try {
    const inquiries = await prisma.inquiry.findMany({
      where: {
        vehicle: {
          sellerId: seller.id,
        },
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        vehicle: {
          select: {
            id: true,
            brand: true,
            model: true,
            year: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(HttpStatusCodes.OK).json({
      inquiries,
    });
  } catch (error) {
    next(error);
  }
}
