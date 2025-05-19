import { TCard, TMessage, TReaction, TRoom, TTask } from "./types";

export type TopicDB = {
  card: TCard;
  reactions: Array<TReaction>;
  chats: Array<TMessage | TTask>;
};

export type MeetingDB = {
  topics: TopicDB[];
  tasks: TTask[];
};

export type RoomDB = TRoom & Partial<MeetingDB>;
