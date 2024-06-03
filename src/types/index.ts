interface Node {
  id: string;
}

export interface Golfer extends Node {
  id: string;
  name: string;
}

export interface CourseHole extends Node {
  id: string;
  hole_number: number;
  par?: number;
  yards?: number;
  description?: string;
}

export interface Course extends Node {
  name: string;
  holes: CourseHole[];
}

export interface Round extends Node {
  date: string;
  golfers: Golfer[];
  scores: Score[];
  course: Course;
  completed?: boolean;
}

export interface Score extends Node {
  id: string;
  hole_id: string;
  round_id: string;
  score: number;
  golfer: string;
}
