export type FourYearPlan = YearPlan[];

export type YearPlan = {
  semesters: Semesters;
};

export type Semesters = {
  fall: Semester;
  spring: Semester;
  summer: Semester;
};

export type Semester = {
  courses: Course[];
};

export type Course = {
  id: string;
  code: string;
  name: string;
  description: string;

  credits: {
    min: number;
    max: number;
    display: string;
  };
};
