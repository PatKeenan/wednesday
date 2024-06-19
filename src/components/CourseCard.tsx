import type { CourseSchema } from "@/types";
import { Card, CardHeader, CardTitle } from "./ui/card";

export const CourseCard = ({ name }: CourseSchema) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
    </Card>
  );
};
