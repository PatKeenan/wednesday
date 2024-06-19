import { z } from "zod";
import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  boolean,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z as zType } from "zod";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `mid-week-gc_${name}`);

export const scores = createTable(
  "score",
  {
    id: serial("id").primaryKey(),
    holeId: integer("holeId")
      .notNull()
      .references(() => holes.id, { onDelete: "cascade" }),
    roundId: integer("roundId")
      .notNull()
      .references(() => rounds.id, { onDelete: "cascade" }),
    golferId: integer("golferId")
      .notNull()
      .references(() => golfers.id, { onDelete: "cascade" }),
    strokes: integer("strokes"),
    putts: integer("putts"),
    drive: varchar("drive", { length: 256 }),
  },
  (score) => ({
    holeIdIdx: index("score_holeId_idx").on(score.holeId),
    roundIdIdx: index("score_roundId_idx").on(score.roundId),
    golferIdx: index("score_golfer_idx").on(score.golferId),
  }),
);

export const scoreRelations = relations(scores, ({ one }) => ({
  hole: one(holes, { fields: [scores.holeId], references: [holes.id] }),
  round: one(rounds, { fields: [scores.roundId], references: [rounds.id] }),
  golfer: one(golfers, { fields: [scores.golferId], references: [golfers.id] }),
}));

export const scoreInsertSchema = createInsertSchema(scores);
export const scoreSelectSchema = createSelectSchema(scores);

export const golfers = createTable(
  "golfer",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
  },
  (golfer) => ({
    nameIndex: index("golfer_name_idx").on(golfer.name),
  }),
);

export const golferRelations = relations(golfers, ({ many }) => ({
  golfersToRounds: many(golfersToRounds),
  scores: many(scores),
}));

export const golferInsertSchema = createInsertSchema(golfers);
export const golferSelectSchema = createSelectSchema(golfers);

export const golfersToRounds = createTable("golfersToRounds", {
  round_id: integer("round_id")
    .notNull()
    .references(() => rounds.id, { onDelete: "cascade" }),
  golfer_id: integer("golfer_id")
    .notNull()
    .references(() => golfers.id),
});

export const golfersToRoundsRelations = relations(
  golfersToRounds,
  ({ one }) => ({
    golfer: one(golfers, {
      fields: [golfersToRounds.golfer_id],
      references: [golfers.id],
    }),
    round: one(rounds, {
      fields: [golfersToRounds.round_id],
      references: [rounds.id],
    }),
  }),
);

export type GolferSelect = zType.infer<typeof golferSelectSchema>;

export const rounds = createTable(
  "round",
  {
    id: serial("id").primaryKey(),
    courseId: integer("courseId")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    date: timestamp("date", { withTimezone: true }).notNull(),
    numHoles: integer("numHoles").default(18),
    status: varchar("status", { length: 255 }),
    completed: boolean("completed").default(false),
    inProgress: boolean("inProgress").default(false),
    currentHole: integer("currentHole").default(1),
    extraHoles: boolean("extraHoles").default(false),
    extraFrontNine: boolean("extraFrontNine").default(false),
    extraBackNine: boolean("extraBackNine").default(false),
  },
  (round) => ({
    courseIdIdx: index("round_courseId_idx").on(round.courseId),
  }),
);

export const roundInsertSchema = createInsertSchema(rounds);
export const withGolfersSchema = z.object({
  golferIds: z.array(golferSelectSchema.pick({ id: true })).optional(),
});

export const roundInsertWithGolfersSchema =
  roundInsertSchema.merge(withGolfersSchema);
export const roundSelectSchema = createSelectSchema(rounds);

export type RoundSelect = zType.infer<typeof roundSelectSchema>;
export type RoundSelectWithCourseAndGolfers = RoundSelect & {
  course?: { id: number; name: string; holes?: number };
  golfers?: { golfer: { id: number; name: string } }[];
};

export const roundRelations = relations(rounds, ({ one, many }) => ({
  course: one(courses, { fields: [rounds.courseId], references: [courses.id] }),
  scores: many(scores),
  golfers: many(golfersToRounds),
}));

export const courses = createTable(
  "course",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    par: integer("par"),
    total_holes: integer("holes"),
  },
  (course) => ({
    nameIndex: index("course_name_idx").on(course.name),
  }),
);

export const courseRelations = relations(courses, ({ many }) => ({
  holes: many(holes),
  rounds: many(rounds),
}));

export const courseInsertSchema = createInsertSchema(courses);
export const courseSelectSchema = createSelectSchema(courses);

export const holes = createTable(
  "hole",
  {
    id: serial("id").primaryKey(),
    courseId: integer("courseId")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    holeNumber: integer("holeNumber").notNull(),
    par: integer("par"),
    yards: integer("yards"),
    description: text("description"),
  },
  (hole) => ({
    courseIdIdx: index("hole_courseId_idx").on(hole.courseId),
  }),
);

export const holeRelations = relations(holes, ({ one, many }) => ({
  course: one(courses, { fields: [holes.courseId], references: [courses.id] }),
  scores: many(scores),
}));

export const holeInsertSchema = createInsertSchema(holes);
export const holeSelectSchema = createSelectSchema(holes);
export type HoleSelect = zType.infer<typeof holeSelectSchema>;
export type HolesInsert = zType.infer<typeof holeInsertSchema>;

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
