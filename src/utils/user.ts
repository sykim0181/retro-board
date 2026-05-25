import { TUser } from "@/types/types";
import { nanoid } from "nanoid";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

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

export function checkFirstVisit(): boolean {
  const key = "retro-user-visited";
  if (localStorage.getItem(key)) return false;
  localStorage.setItem(key, "true");
  return true;
}

export function getUser(): TUser {
  const key = "retro-user";
  const user = localStorage.getItem(key);
  // const user = sessionStorage.getItem(key);
  if (user) {
    return JSON.parse(user);
  }

  const newUser = generateUser();
  localStorage.setItem(key, JSON.stringify(newUser));
  // sessionStorage.setItem(key, JSON.stringify(newUser));
  return newUser;
}
