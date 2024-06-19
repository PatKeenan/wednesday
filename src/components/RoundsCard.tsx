import type { CourseSchema, RoundSchema } from "@/types";

export const RoundsCard = ({
  course,
  date,
}: RoundSchema & {
  course: CourseSchema;
}) => {
  return (
    <div>
      <time>
        {date.toDateString()} @{course.name}
      </time>
    </div>
  );
};
