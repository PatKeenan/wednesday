import type { z } from "zod";

import type {
  courseSelectSchema,
  golferSelectSchema,
  holeSelectSchema,
  roundSelectSchema,
  scoreSelectSchema,
} from "@/server/db/schema";

export type GolferSchema = z.infer<typeof golferSelectSchema>;
export type HoleSchema = z.infer<typeof holeSelectSchema>;
export type CourseSchema = z.infer<typeof courseSelectSchema>;
export type ScoreSchema = z.infer<typeof scoreSelectSchema>;
export type RoundSchema = z.infer<typeof roundSelectSchema>;
