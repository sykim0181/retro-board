import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { TCard, TColumnType, TUser } from "./types";

// key: type of column, value: id of task(card)
export type Board = LiveMap<TColumnType, LiveList<string>>;

export type Chat = LiveObject<{
  user: TUser;
  content: string;
  createdAt: string;
  replies: LiveList<Chat>;
}>

export type Card = LiveObject<TCard>;

export type Task = LiveObject<{
  card: Card;
  chats: LiveList<Chat>;
}>;

export type Storage = {
  board: Board;
  tasks: LiveMap<string, Task>;
}
