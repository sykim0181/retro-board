export type TColumnType = "start" | "stop" | "continue";

export type TCard = {
  id: string;
  category: TColumnType;
  title: string;
  content: string;
  likes: TLike[];
};

export type TLike = {
  user: TUser;
};

export type TBoard = Map<TColumnType, Array<string>>;

export type TUser = {
  id: string;
  name: string;
};

export type TRoom = {
  name: string;
  id: string;
  ownerId: string;
};

export type TChat = {
  user: TUser;
  content: string;
  createdAt: string;
  replies: Array<TChat>;
};

export type TTask = {
  card: TCard;
  reactions: Map<string, TReaction>;
  chats: Array<TChat>;
};

export type TEmoji = {
  unified: string;
  name: string;
};

export type TReaction = {
  emoji: TEmoji;
  users: TUser[];
};

export type TRoomPhase = "REFLECT" | "VOTE" | "DISCUSS";
