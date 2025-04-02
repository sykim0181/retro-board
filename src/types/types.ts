export type TColumnType = "start" | "end" | "continue";

export type TCard = {
  id: string;
  category: TColumnType;
  content: string;
  likes: number;
};

export type TBoard = {
  [key in TColumnType]: TCard[];
};

export type TUser = {
  name: string;
};
