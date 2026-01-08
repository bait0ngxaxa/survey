import { z } from "zod";

// Get Submissions Parameters Schema
export const GetSubmissionsParamsSchema = z.object({
    page: z.number().min(1).max(10000).default(1),
    pageSize: z.number().min(1).max(10000).default(10),
    regionFilter: z.string().max(100).default(""),
    searchQuery: z.string().max(200).default(""),
});

export type GetSubmissionsParams = z.infer<typeof GetSubmissionsParamsSchema>;
