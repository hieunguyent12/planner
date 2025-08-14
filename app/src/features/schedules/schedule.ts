import {
  CoursesSchema,
  luxonDateTimeOptions,
  luxonFormatString,
  type BaseCourseSchema,
  type BaseCourseSectionSchema,
  type CoursesSchemaType,
  type DetailedCourseSectionSchemaType,
  type InPersonCourseSectionSchema,
  type MeetingSchemaType,
  type OnlineCourseSectionSchema,
} from "@/features/schedules/schema";
import { Store } from "@/features/schedules/store";
import type z from "zod";
import { colors } from "./colors";
import { fetchCourseSections as apiFetchCourseSections } from "@/features/schedules/api";
import { DateTime, Interval } from "luxon";

export type SemesterType = {
  year: number;
  season: "fall" | "spring" | "summer";
};

export class Schedule extends Store {
  courseSections: DetailedCourseSectionSchemaType[] = [];
  name!: string;
  id!: number;
  credits!: string;
  semester!: SemesterType;
  availableColors!: Array<(typeof colors)[number]>;

  constructor({
    courseSections,
    id,
    name,
    credits = "0",
    semester = {
      year: 2025,
      season: "fall",
    },
    availableColors = [...colors],
  }: {
    courseSections: DetailedCourseSectionSchemaType[];
    id: number;
    name?: string;
    credits?: string;
    semester?: SemesterType;
    availableColors?: Array<(typeof colors)[number]>;
  }) {
    super();
    this.courseSections = courseSections;
    this.name = name ?? `Schedule #${id}`;
    this.id = id;
    this.credits = credits;
    this.semester = semester;
    this.availableColors = availableColors;
  }

  getSnapshot() {
    return this.courseSections;
  }

  setName(newName: string) {
    if (newName !== "") {
      this.name = newName;
    }
    this.notifySubscribers();
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
    this.credits = this.calculateTotalCredits();

    const randomColorIdx = Math.floor(
      Math.random() * this.availableColors.length
    );
    const color = this.availableColors[randomColorIdx];
    this.availableColors.splice(randomColorIdx, 1);

    section.setColor(color);

    this.notifySubscribers();
    return true;
  }

  canAddSection(sectionToAdd: DetailedCourseSectionSchemaType):
    | {
        success: false;
        reason: "duplicate" | "conflict";
        conflicts?: InPersonCourseSection[];
      }
    | { success: true } {
    const conflicts: InPersonCourseSection[] = [];

    for (const section of this.courseSections) {
      if (section.code === sectionToAdd.code) {
        return { success: false, reason: "duplicate" };
      }

      if (section.online || sectionToAdd.online) continue;

      if (section.overlaps(sectionToAdd)) {
        conflicts.push(section as InPersonCourseSection);
      }
    }

    if (conflicts.length > 0) {
      return { success: false, reason: "conflict", conflicts };
    }

    return { success: true };
  }

  removeCourseSection(sectionToRemove: DetailedCourseSectionSchemaType) {
    this.courseSections = this.courseSections.filter(
      (section) => section != sectionToRemove
    );

    this.credits = this.calculateTotalCredits();
    this.availableColors.push(sectionToRemove.color);
    this.notifySubscribers();
  }

  getSemester(): SemesterType {
    return this.semester;
  }

  setSemester(newSemester: SemesterType) {
    this.semester = newSemester;
    this.notifySubscribers();
  }

  private calculateTotalCredits(): string {
    let totalCredits = 0;
    for (const section of this.courseSections) {
      if (typeof section.credits === "string") {
        return "VAR";
      }

      totalCredits += section.credits;
    }

    return totalCredits.toString();
  }

  async fetchCourseSections(code: string): Promise<CoursesSchemaType> {
    const res = await apiFetchCourseSections(code);

    if (!res.courses) {
      return [];
    }

    const courses = res.courses.map((course: any) => ({
      ...course,
      sections: JSON.parse(course.sections),
    }));

    const { error, data } = CoursesSchema.safeParse(courses);

    if (error) {
      throw error;
    }

    return data;
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

  static load(schedule: Schedule) {
    const loadedSchedule = new Schedule(schedule);

    loadedSchedule.courseSections = loadedSchedule.courseSections.map(
      (section) => {
        if (!section.online) {
          return InPersonCourseSection.load(section);
        } else {
          return new OnlineCourseSection(section);
        }
      }
    );

    return loadedSchedule;
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
  color!: any;

  constructor(props: any) {
    Object.assign(this, props);
  }

  abstract overlaps(other: CourseSection): boolean;
  setColor(newColor: any) {
    this.color = newColor;
  }
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

  static load(section: InPersonCourseSection) {
    const newSection = new InPersonCourseSection(section);

    newSection.meetings = newSection.meetings.map((meeting) => {
      const time = meeting.time.display.split("-");
      const start = DateTime.fromFormat(
        time[0].slice(0, -1),
        luxonFormatString,
        luxonDateTimeOptions
      );
      const end = DateTime.fromFormat(
        time[1].slice(1),
        luxonFormatString,
        luxonDateTimeOptions
      );
      return {
        ...meeting,
        time: {
          ...meeting.time,
          start,
          end,
          timeInterval: Interval.fromDateTimes(start, end),
        },
      };
    });

    return newSection;
  }
}

export class OnlineCourseSection
  extends CourseSection
  implements z.infer<typeof OnlineCourseSectionSchema>
{
  online: true = true;

  constructor(props: z.infer<typeof OnlineCourseSectionSchema>) {
    super(props);
  }

  overlaps(_: OnlineCourseSection): boolean {
    return false;
  }
}
