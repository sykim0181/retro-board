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

export function generateRandomName(): string {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: " ",
    style: "capital",
  });
  return randomName;
}

export function generateUser(): TUser {
  const randomName = generateRandomName();
  return {
    id: nanoid(),
    name: randomName,
  };
}

export function getUser(): TUser {
  const key = "retro-user";
  // const user = localStorage.getItem(key);
  const user = sessionStorage.getItem(key);
  if (user) {
    return JSON.parse(user);
  }

  const newUser = generateUser();
  // localStorage.setItem(key, JSON.stringify(newUser));
  sessionStorage.setItem(key, JSON.stringify(newUser));
  return newUser;
}

export function getDateDiff(date: string) {
  const parsedDate = dayjs(date);
  const now = dayjs();
  const diffString = dayjs(parsedDate).from(now);
  return diffString;
}
