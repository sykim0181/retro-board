import { useStorage } from "@liveblocks/react/suspense";
import { TBoard, TCard, TColumnType } from "@/types/types";

interface useDiscussProps {
  cardIdx: number;
}

const useDiscuss = (props: useDiscussProps) => {
  const { cardIdx } = props;

  const card = useStorage((root) => {
    let result: TCard[] = [];
    const board = root.board as TBoard;
    const columns: TColumnType[] = ["start", "end", "continue"];
    columns.forEach((column) => {
      const items = board[column];
      result = [...result, ...items];
    });

    if (cardIdx > result.length - 1) {
      return null;
    }

    return result[cardIdx];
  });

  return {
    card,
  };
};

export default useDiscuss;
