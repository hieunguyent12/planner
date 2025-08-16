import { createFileRoute } from "@tanstack/react-router";
import { Plan } from "@/features/plans/components/plan";
import { Container } from "@/components/container";

export const Route = createFileRoute("/plans/")({
  component: RouteComponent,
});

const courses: any[] = [
  {
    id: "1",
    code: "MAC2303",
    name: "Calculus 3",
    description: "this is a description",

    credits: {
      min: 4,
      max: 4,
      display: "4",
    },
  },

  {
    id: "2",
    code: "ENT3003",
    name: "Intro to Entrepreneurship",
    description: "this is a description",

    credits: {
      min: 3,
      max: 3,
      display: "3",
    },
  },

  {
    id: "3",
    code: "ACG2001",
    name: "Financial Accounting",
    description: "this is a description",

    credits: {
      min: 4,
      max: 4,
      display: "4",
    },
  },
];

export const BasicFourYearPlan: any = [
  {
    semesters: {
      fall: {
        courses,
      },
      spring: {
        courses,
      },
      summer: {
        courses,
      },
    },
  },
  {
    semesters: {
      fall: {
        courses,
      },
      spring: {
        courses,
      },
      summer: {
        courses,
      },
    },
  },
  {
    semesters: {
      fall: {
        courses,
      },
      spring: {
        courses,
      },
      summer: {
        courses,
      },
    },
  },
  {
    semesters: {
      fall: {
        courses,
      },
      spring: {
        courses,
      },
      summer: {
        courses,
      },
    },
  },
];

function RouteComponent() {
  return (
    <div className="flex justify-center h-[92%]">
      <Container className="w-[75%] border-r-1 border-r-background px-3 overflow-y-scroll scrollbar">
        <Plan fourYearPlan={BasicFourYearPlan} />
      </Container>
    </div>
  );
}
