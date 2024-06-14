import { CourseSchema } from "@/types";
import { Card, CardHeader, CardTitle } from "./ui/card";

export const CourseCard = ({ name, id }: CourseSchema) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
    </Card>
  );
};
