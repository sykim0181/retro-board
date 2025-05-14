import { TCard, TChat, TReaction, TRoom, TTask } from "./types";

export type TopicDB = {
  card: TCard;
  reactions: Array<TReaction>;
  chats: Array<TChat>;
};

export type MeetingDB = {
  topics: TopicDB[];
  tasks: TTask[];
};

export type RoomDB = TRoom & Partial<MeetingDB>;
