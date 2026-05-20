import { TColumnType } from "@/types/types";
import { useRoomContext } from "@/context/RoomContext";

interface useColumnProps {
  type: TColumnType;
}

const useColumn = (props: useColumnProps) => {
  const { type } = props;
  const { state } = useRoomContext();
  const cardIdList = state.board[type] ?? [];

  return { cardIdList };
};

export default useColumn;
