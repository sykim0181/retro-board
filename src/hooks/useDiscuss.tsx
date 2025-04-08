import { useStorage } from "@liveblocks/react/suspense";
import { TCard, TColumnType } from "@/types/types";

interface useDiscussProps {
  cardIdx: number;
}

const useDiscuss = (props: useDiscussProps) => {
  const { cardIdx } = props;

  const card = useStorage((root) => {
    const idx = cardIdx - 1;

    let ids: string[] = [];
    const board = root.board;
    const columns: TColumnType[] = ["start", "end", "continue"];
    columns.forEach((column) => {
      const cards = board.get(column) ?? [];
      ids = [...ids, ...cards];
    });

    const tasks = root.tasks;
    let result: TCard[] = [];
    ids.forEach((id) => {
      const task = tasks.get(id);
      if (task !== undefined) {
        result = [...result, task.card as TCard];
      }
    });

    if (idx >= result.length) {
      return null;
    }

    return result[idx];
  });

  return {
    card,
  };
};

export default useDiscuss;
