/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getSellerInbox } from "./_action";
import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
    const data = await getSellerInbox();
    const inquiries = data.inquiries;

    if (!inquiries.length) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <p className="text-muted-foreground">No inquiries yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Inbox</h1>

            {inquiries.map((inquiry: any) => (
                <Card key={inquiry.id}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-base">
                            {inquiry.vehicle.brand} {inquiry.vehicle.model}
                        </CardTitle>

                        <div className="text-sm text-muted-foreground">
                            From <span className="font-medium">{inquiry.buyer.name}</span>{" "}
                            ({inquiry.buyer.email})
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <p className="text-sm">{inquiry.message}</p>

                        <Separator />

                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                                Year: {inquiry.vehicle.year} • $
                                {inquiry.vehicle.price.toLocaleString()}
                            </span>
                            <span>
                                {new Date(inquiry.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}