import type {
  BaseCourseSchema,
  BaseCourseSectionSchema,
  DetailedCourseSectionSchemaType,
  InPersonCourseSectionSchema,
  MeetingSchemaType,
  OnlineCourseSectionSchema,
} from "@/features/schedules/schema";
import { Store } from "@/features/schedules/store";
import type z from "zod";

export type SemesterType = {
  year: number;
  season: "Fall" | "Spring" | "Summer";
};

export class Schedule extends Store {
  courseSections: DetailedCourseSectionSchemaType[] = [];
  semester!: SemesterType;

  constructor(courseSections: DetailedCourseSectionSchemaType[]) {
    super();
    this.courseSections = courseSections;
  }

  getSnapshot() {
    return this.courseSections;
  }

  getCourseSections(): DetailedCourseSectionSchemaType[] {
    return this.courseSections;
  }

  addCourseSection(section: DetailedCourseSectionSchemaType): boolean {
    const newCourseSections = [...this.courseSections, section];

    if (!Schedule.isValid(newCourseSections)) {
      return false;
    }

    this.courseSections = [...this.courseSections, section];
    this.notifySubscribers();
    return true;
  }

  removeCourseSection(sectionToRemove: DetailedCourseSectionSchemaType) {
    this.courseSections = this.courseSections.filter(
      (section) => section != sectionToRemove
    );
    this.notifySubscribers();
  }

  getSemester(): SemesterType {
    return this.semester;
  }

  setSemester(newSemester: SemesterType) {
    this.semester = newSemester;
  }

  static isValid(courseSections: DetailedCourseSectionSchemaType[]): boolean {
    for (let i = 0; i < courseSections.length; i++) {
      const section = courseSections[i];
      if (section.online) continue;

      for (let j = i + 1; j < courseSections.length; j++) {
        const otherSection = courseSections[j];
        if (otherSection.online) continue;

        // check duplicate courses or overlapping courses
        if (
          section.code === otherSection.code ||
          section.overlaps(otherSection)
        ) {
          return false;
        }
      }
    }
    return true;
  }
}

export abstract class CourseSection
  implements z.infer<typeof BaseCourseSectionSchema & typeof BaseCourseSchema>
{
  id!: number;
  code!: string;
  name!: string;
  description?: string;
  prerequisites?: string;
  course_number!: number;
  credits!: number | string;
  instructors!: string[];
  color: any;

  constructor(props: any) {
    Object.assign(this, props);
    this.color = {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    };
  }

  abstract overlaps(other: CourseSection): boolean;
}

export class InPersonCourseSection
  extends CourseSection
  implements z.infer<typeof InPersonCourseSectionSchema>
{
  meetings!: MeetingSchemaType[];
  online: false = false;

  constructor(
    props: Omit<z.infer<typeof InPersonCourseSectionSchema>, "online">
  ) {
    super(props);
    this.meetings = props.meetings;
  }

  overlaps(other: InPersonCourseSection): boolean {
    for (const meeting of this.meetings) {
      for (const otherMeeting of other.meetings) {
        for (const day of meeting.time.days) {
          if (
            otherMeeting.time.days.includes(day) &&
            meeting.time.timeInterval.overlaps(otherMeeting.time.timeInterval)
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }
}

export class OnlineCourseSection
  extends CourseSection
  implements z.infer<typeof OnlineCourseSectionSchema>
{
  meetings!: MeetingSchemaType[];
  online: true = true;

  constructor(props: z.infer<typeof OnlineCourseSectionSchema>) {
    super(props);
  }

  overlaps(_: CourseSection): boolean {
    return false;
  }
}
