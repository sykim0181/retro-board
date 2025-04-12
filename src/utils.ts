import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { nanoid } from "nanoid";
import { TUser } from "./types/types";

dayjs.extend(relativeTime);

export function generateUser(): TUser {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: " ",
    style: "capital",
  });

  return {
    id: nanoid(),
    name: randomName,
  };
}

export function getUser(): TUser {
  const key = "retro-user";
  const user = localStorage.getItem(key);
  if (user) {
    return JSON.parse(user);
  }

  const newUser = generateUser();
  localStorage.setItem(key, JSON.stringify(newUser));
  return newUser;
}

export function getDateDiff(date: string) {
  const parsedDate = dayjs(date);
  const now = dayjs();
  const diffString = dayjs(parsedDate).from(now);
  return diffString;
}
