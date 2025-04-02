import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { TUser } from "./types/types";

export function generateUser(): TUser {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: " ",
    style: "capital",
  });

  return {
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
