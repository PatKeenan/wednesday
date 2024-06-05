import { z } from "zod";
interface Node {
  id: string;
}

export interface Golfer extends Node {
  id: string;
  name: string;
}

export const golferSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type GolferSchema = z.infer<typeof golferSchema>;

export interface CourseHole extends Node {
  id: string;
  hole_number: number;
  par?: number;
  yards?: number;
  description?: string;
}
export const courseHoleSchema = z.object({
  id: z.string(),
  hole_number: z.number(),
  par: z.number().optional(),
  yards: z.number().optional(),
  description: z.string().optional(),
});

export type CourseHoleSchema = z.infer<typeof courseHoleSchema>;

export interface Course extends Node {
  name: string;
  holes: CourseHole[];
}
export const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  holes: z.array(courseHoleSchema),
});
export type CourseSchema = z.infer<typeof courseSchema>;

const roundStatusTypeSchema = z.enum([
  "upcoming",
  "booked",
  "completed",
  "pending",
  "in-progress",
  "canceled",
  "rescheduled",
]);
export type RoundStatusType = z.infer<typeof roundStatusTypeSchema>;

export interface Score extends Node {
  id: string;
  hole_id: string;
  round_id: string;
  score: number;
  golfer: string;
}
export const scoreSchema = z.object({
  id: z.string(),
  hole_id: z.string(),
  round_id: z.string(),
  score: z.number(),
  golfer: z.string(),
});
export type ScoreSchema = z.infer<typeof scoreSchema>;

export interface Round extends Node {
  date: string;
  golfers: Golfer[];
  scores: Score[];
  course: Course;
  status?: RoundStatusType;
  completed?: boolean;
}
export const roundSchema = z.object({
  id: z.string(),
  date: z.string(),
  golfers: z.array(golferSchema),
  scores: z.array(scoreSchema),
  course: courseSchema,
  numHoles: z.number().optional().default(18),
  status: roundStatusTypeSchema.optional().default("upcoming"),
  completed: z.boolean().optional().default(false),
  inProgress: z.boolean().optional().default(false),
  currentHole: z.number().optional().default(1),
  extraHoles: z.boolean().optional().default(false),
  extraFrontNine: z.boolean().optional().default(false),
  extraBackNine: z.boolean().optional().default(false),
});
export type RoundSchema = z.infer<typeof roundSchema>;

export const fakeGolfers: Golfer[] = [
  { id: "1", name: "Alex Fox" },
  { id: "2", name: "Chris Barba" },
  { id: "3", name: "Pat Keenan" },
];

export const fakeCourses: Course[] = [
  { name: "Cream Ridge", id: "1", holes: [] },
  { name: "Pine Barrens", id: "2", holes: [] },
];
