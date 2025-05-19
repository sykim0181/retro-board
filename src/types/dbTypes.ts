import { Timestamp } from "firebase/firestore";
import { TCard, TMessage, TReaction, TTask } from "./types";

export type TopicDB = {
  card: TCard;
  reactions: Array<TReaction>;
  chats: Array<TMessage | TTask>;
};

export type MeetingDB = {
  topics: TopicDB[];
  tasks: TTask[];
};

export type RoomDB = {
  name: string;
  id: string;
  ownerId: string;
  date: Timestamp;
} & Partial<MeetingDB>;
