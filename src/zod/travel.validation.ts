import z from "zod";

/** Frontend enum for TravelType */
export enum TravelType {
    SOLO = "SOLO",
    FAMILY = "FAMILY",
    FRIENDS = "FRIENDS",
}

/** Zod schemas for TravelPlan */
export const createTravelPlanZodSchema = z.object({
    title: z.string().min(1, "Title is required"),
    destination: z.string().min(1, "Destination is required"),
    country: z.string().min(1, "Country is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    budget: z.number().optional(),
    description: z.string().optional(),
    travelType: z.enum([TravelType.SOLO, TravelType.FAMILY, TravelType.FRIENDS]),
    // photos: z.array(z.string()).optional(),
    photos: z.array(z.instanceof(File).refine((file) => file.size > 0, "photo is required")).optional(),
    visibility: z.boolean().optional(),
});

export const updateTravelPlanZodSchema = z.object({
    title: z.string().optional(),
    destination: z.string().optional(),
    country: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    budget: z.number().optional(),
    description: z.string().optional(),
    travelType: z.enum([TravelType.SOLO, TravelType.FAMILY, TravelType.FRIENDS]).optional(),
    // photos: z.array(z.string()).optional(),
    // photos: z.array(z.instanceof(File).refine((file) => file.size > 0, "Update photo is required")).optional(),
    photos: z.array(z.instanceof(File)).optional(),
    visibility: z.boolean().optional(),
});