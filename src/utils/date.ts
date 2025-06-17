import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function getDateDiff(date: string) {
  const parsedDate = dayjs(date);
  const now = dayjs();
  const diffString = dayjs(parsedDate).from(now);
  return diffString;
}
