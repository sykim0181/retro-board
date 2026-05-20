import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { TColumnType } from "@/types/types";
import { useState } from "react";
import { useRoomContext } from "@/context/RoomContext";

const useEditableBoard = () => {
  const { state, send } = useRoomContext();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCardId(event.active.id.toString());
  };

  const handleDragOver = (_event: DragOverEvent) => {
    // 드롭 완료 시점에만 MOVE_CARD 전송
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCardId(null);
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id.toString();
    const fromCol = active.data.current?.column as TColumnType;
    const overId = over.id.toString();

    let toCol: TColumnType;
    let toIndex: number;

    if (overId.startsWith("column-")) {
      toCol = overId.slice("column-".length) as TColumnType;
      if (fromCol === toCol) return;
      toIndex = state.board[toCol].length;
    } else {
      if (overId === cardId) return;
      toCol = over.data.current?.column as TColumnType;

      if (fromCol === toCol) {
        // 같은 컬럼: 드래그 카드를 제외한 배열에서 목표 인덱스 계산
        const filtered = state.board[fromCol].filter((id) => id !== cardId);
        toIndex = filtered.indexOf(overId);
        if (toIndex === -1) return;
      } else {
        // 다른 컬럼: toCol에서 대상 카드 앞에 삽입
        toIndex = state.board[toCol].indexOf(overId);
        if (toIndex === -1) toIndex = state.board[toCol].length;
      }
    }

    send({ type: "MOVE_CARD", cardId, fromCol, toCol, toIndex });
  };

  return { activeCardId, handleDragStart, handleDragOver, handleDragEnd };
};

export default useEditableBoard;
