import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { TCard, TChat, TColumnType, TEmoji, TMessage, TRoomPhase, TTask, TUser } from "./types";

// key: type of column, value: id of card
export type Board = LiveMap<TColumnType, LiveList<string>>;

export type Message = LiveObject<TMessage>;

export type Task = LiveObject<TTask>;

export type Card = LiveObject<TCard>;

export type Reaction = LiveObject<{
  emoji: TEmoji;
  users: TUser[];
}>;

export type Topic = LiveObject<{
  card: TCard;
  reactions: LiveMap<string, Reaction>;
  chats: LiveList<TChat>;
}>;

export type Storage = {
  board: Board;
  cards: LiveMap<string, Card>;
  topics: LiveList<Topic>;
  phase: TRoomPhase;
  tasks: LiveMap<string, Task>;
  messages: LiveMap<string, Message>;
};
