import { LiveList, LiveMap } from "@liveblocks/client";
import { Storage } from "./types/liveblocks";

export const initialRoomStorage: Storage = {
  board: new LiveMap([
    ["start", new LiveList([])],
    ["stop", new LiveList([])],
    ["continue", new LiveList([])],
  ]),
  cards: new LiveMap(),
  topics: new LiveList([]),
  phase: "REFLECT",
  tasks: new LiveMap(),
  messages: new LiveMap(),
};
