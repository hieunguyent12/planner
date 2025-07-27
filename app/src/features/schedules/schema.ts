import {
  InPersonCourseSection,
  OnlineCourseSection,
} from "@/features/schedules/schedule";
import { DateTime, Interval } from "luxon";
import z from "zod";

const luxonFormatString = "h:mm a";
const luxonDateTimeOptions = {
  zone: "utc",
};

const color = {
  bg: "#fff7ed",
  hover: "#ffedd4",
  side: "#ffb86a",
};

export const BaseCourseSchema = z.object({
  id: z.number(),
  code: z.string("Course code must be defined."),
  name: z.string("Course must have a name."),
  description: z.string().optional(),
  prerequisites: z.string().optional(),
});

export const BaseCourseSectionSchema = z.object({
  course_number: z.number(),
  credits: z.number().or(z.string()),
  instructors: z.array(z.string()),
});

export const MeetingSchema = z.object({
  location: z
    .object({
      building: z.string(),
      room: z.string(),
    })
    .transform((data) => ({
      ...data,
      display: `${data.building} ${data.room}`,
    })),
  time: z
    .object({
      days: z.array(z.enum(["M", "T", "W", "R", "F"])),
      start: z
        .union([
          z.string(),
          // have to do this since DateTime doesn't have a public constructor
          z.custom<DateTime>((val) => val instanceof DateTime),
        ])
        .transform((val) =>
          typeof val === "string"
            ? DateTime.fromFormat(val, luxonFormatString, luxonDateTimeOptions)
            : val
        ),
      end: z
        .union([
          z.string(),
          z.custom<DateTime>((val) => val instanceof DateTime),
        ])
        .transform((val) =>
          typeof val === "string"
            ? DateTime.fromFormat(val, luxonFormatString, luxonDateTimeOptions)
            : val
        ),
    })
    .transform((data) => ({
      ...data,
      display: `${data.start.toFormat("h:mm a")} - ${data.end.toFormat(
        "h:mm a"
      )}`,
      timeInterval: Interval.fromDateTimes(data.start, data.end),
    })),
});

export const InPersonCourseSectionSchema = BaseCourseSectionSchema.extend({
  online: z.literal(false),
  // a course section can have multiple meetings per week
  meetings: z.array(MeetingSchema),
});

export const OnlineCourseSectionSchema = BaseCourseSectionSchema.extend({
  online: z.literal(true),
});

export const CourseSectionSchema = z.discriminatedUnion("online", [
  InPersonCourseSectionSchema,
  OnlineCourseSectionSchema,
]);

export const CourseSchema = BaseCourseSchema.extend({
  // a course can have multiple sections, each with possible different meeting times and instructors
  sections: z.array(CourseSectionSchema),
}).transform((data) => {
  return {
    ...data,
    color,
  };
});

// a particular course section that also includes the course information like course code and name.
// note this is not equivalent to CourseSectionSchema because that schema doesn't include course info.
export const DetailedCourseSectionSchema = z.discriminatedUnion("online", [
  BaseCourseSchema.extend(InPersonCourseSectionSchema.shape).transform(
    (data) => new InPersonCourseSection(data)
  ),
  BaseCourseSchema.extend(OnlineCourseSectionSchema.shape).transform(
    (data) => new OnlineCourseSection(data)
  ),
]);

export const CoursesSchema = z.array(CourseSchema);

export type CourseSchemaType = z.infer<typeof CourseSchema>;
export type CoursesSchemaType = z.infer<typeof CoursesSchema>;
export type CourseSectionSchemaType = z.infer<typeof CourseSectionSchema>;
export type DetailedCourseSectionSchemaType = z.infer<
  typeof DetailedCourseSectionSchema
>;
export type MeetingSchemaType = z.infer<typeof MeetingSchema>;
