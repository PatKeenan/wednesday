ALTER TABLE "mid-week-gc_golfersToRounds" DROP CONSTRAINT "mid-week-gc_golfersToRounds_round_id_mid-week-gc_round_id_fk";
--> statement-breakpoint
ALTER TABLE "mid-week-gc_hole" DROP CONSTRAINT "mid-week-gc_hole_courseId_mid-week-gc_course_id_fk";
--> statement-breakpoint
ALTER TABLE "mid-week-gc_round" DROP CONSTRAINT "mid-week-gc_round_courseId_mid-week-gc_course_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_golfersToRounds" ADD CONSTRAINT "mid-week-gc_golfersToRounds_round_id_mid-week-gc_round_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."mid-week-gc_round"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_hole" ADD CONSTRAINT "mid-week-gc_hole_courseId_mid-week-gc_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."mid-week-gc_course"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_round" ADD CONSTRAINT "mid-week-gc_round_courseId_mid-week-gc_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."mid-week-gc_course"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
