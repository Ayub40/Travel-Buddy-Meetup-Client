/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

/** GET APP STATISTICS (Admin dashboard view) */
export async function getAppStatistics() {
    try {
        const response = await serverFetch.get("/admin/statistics", {
            next: { revalidate: 30 }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get statistics error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch statistics",
            data: [],
        };
    }
}