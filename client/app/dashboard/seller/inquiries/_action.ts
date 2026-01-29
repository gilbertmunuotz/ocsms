/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import axios from "axios";
import { auth } from "@/auth";
import { SERVER_URI } from "@/constants/constant";

export async function getSellerInbox() {
    const session = await auth();

    if (!session?.user?.token) {
        throw new Error("Unauthorized");
    }

    try {
        const response = await axios.get(
            `${SERVER_URI}/api/v1/inquiry/inbox`,
            {
                headers: {
                    Authorization: `token ${session.user.token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch seller inbox:", error.message);
        throw new Error("Could not fetch inquiries");
    }
}
