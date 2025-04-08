import { TColumnType } from "@/types/types";
import { useStorage } from "@liveblocks/react/suspense";

interface useColumnProps {
  type: TColumnType;
}

const useColumn = (props: useColumnProps) => {
  const { type } = props;

  const cardIdList = useStorage((root) => root.board.get(type)) ?? [];

  return {
    cardIdList,
  };
};

export default useColumn;
