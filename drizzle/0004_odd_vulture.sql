CREATE TABLE IF NOT EXISTS "mid-week-gc_golfersToRounds" (
	"round_id" integer NOT NULL,
	"golfer_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_golfersToRounds" ADD CONSTRAINT "mid-week-gc_golfersToRounds_round_id_mid-week-gc_round_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."mid-week-gc_round"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_golfersToRounds" ADD CONSTRAINT "mid-week-gc_golfersToRounds_golfer_id_mid-week-gc_golfer_id_fk" FOREIGN KEY ("golfer_id") REFERENCES "public"."mid-week-gc_golfer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
