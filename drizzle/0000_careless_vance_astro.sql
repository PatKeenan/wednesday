CREATE TABLE IF NOT EXISTS "mid-week-gc_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "mid-week-gc_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_course" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"par" integer,
	"holes" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_golfer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_golfersToRounds" (
	"round_id" integer NOT NULL,
	"golfer_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_hole" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" integer NOT NULL,
	"holeNumber" integer NOT NULL,
	"par" integer,
	"yards" integer,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_round" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"numHoles" integer DEFAULT 18,
	"status" varchar(255),
	"completed" boolean DEFAULT false,
	"inProgress" boolean DEFAULT false,
	"currentHole" integer DEFAULT 1,
	"extraHoles" boolean DEFAULT false,
	"extraFrontNine" boolean DEFAULT false,
	"extraBackNine" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_score" (
	"id" serial PRIMARY KEY NOT NULL,
	"holeId" integer NOT NULL,
	"roundId" integer NOT NULL,
	"golfer" integer NOT NULL,
	"score" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mid-week-gc_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "mid-week-gc_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_account" ADD CONSTRAINT "mid-week-gc_account_userId_mid-week-gc_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."mid-week-gc_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_golfersToRounds" ADD CONSTRAINT "mid-week-gc_golfersToRounds_round_id_mid-week-gc_round_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."mid-week-gc_round"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_golfersToRounds" ADD CONSTRAINT "mid-week-gc_golfersToRounds_golfer_id_mid-week-gc_golfer_id_fk" FOREIGN KEY ("golfer_id") REFERENCES "public"."mid-week-gc_golfer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_hole" ADD CONSTRAINT "mid-week-gc_hole_courseId_mid-week-gc_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."mid-week-gc_course"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_round" ADD CONSTRAINT "mid-week-gc_round_courseId_mid-week-gc_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."mid-week-gc_course"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_score" ADD CONSTRAINT "mid-week-gc_score_holeId_mid-week-gc_hole_id_fk" FOREIGN KEY ("holeId") REFERENCES "public"."mid-week-gc_hole"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_score" ADD CONSTRAINT "mid-week-gc_score_roundId_mid-week-gc_round_id_fk" FOREIGN KEY ("roundId") REFERENCES "public"."mid-week-gc_round"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_score" ADD CONSTRAINT "mid-week-gc_score_golfer_mid-week-gc_golfer_id_fk" FOREIGN KEY ("golfer") REFERENCES "public"."mid-week-gc_golfer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_session" ADD CONSTRAINT "mid-week-gc_session_userId_mid-week-gc_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."mid-week-gc_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "mid-week-gc_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_name_idx" ON "mid-week-gc_course" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "golfer_name_idx" ON "mid-week-gc_golfer" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hole_courseId_idx" ON "mid-week-gc_hole" ("courseId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "round_courseId_idx" ON "mid-week-gc_round" ("courseId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "score_holeId_idx" ON "mid-week-gc_score" ("holeId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "score_roundId_idx" ON "mid-week-gc_score" ("roundId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "score_golfer_idx" ON "mid-week-gc_score" ("golfer");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "mid-week-gc_session" ("userId");