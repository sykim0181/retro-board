import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { TCard, TColumnType, TEmoji, TUser } from "./types";

// key: type of column, value: id of task(card)
export type Board = LiveMap<TColumnType, LiveList<string>>;

export type Chat = LiveObject<{
  user: TUser;
  content: string;
  createdAt: string;
  replies: LiveList<Chat>;
}>

export type Card = LiveObject<TCard>;

export type Reaction = LiveObject<{
  emoji: TEmoji;
  users: TUser[];
}>;

export type Task = LiveObject<{
  card: Card;
  reactions: LiveMap<string, Reaction>;
  chats: LiveList<Chat>;
}>;

export type Storage = {
  board: Board;
  tasks: LiveMap<string, Task>;
}
