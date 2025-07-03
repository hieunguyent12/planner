import type { DayOfWeek } from "@/types";

const WEEK_DAYS: DayOfWeek[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// @ts-ignore
// const WEEK_DAYS: DayOfWeek[] = ["M", "T", "W", "R", "F"];
const NUM_HOURS_PER_DAY = 24;

export { WEEK_DAYS, NUM_HOURS_PER_DAY };
