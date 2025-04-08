export type TColumnType = "start" | "end" | "continue";

export type TCard = {
  id: string;
  category: TColumnType;
  content: string;
  likes: number;
};

export type TBoard = Map<TColumnType, Array<string>>;

export type TUser = {
  name: string;
};

export type TRoom = {
  name: string;
  id: string;
};

export type TChat = {
  user: TUser;
  content: string;
  createdAt: string;
  replies: Array<TChat>;
};

export type TTask = {
  card: TCard;
  chats: Array<TChat>;
};
