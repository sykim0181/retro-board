import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { useMutation } from "@liveblocks/react/suspense";
import { TColumnType } from "@/types/types";
import { useState } from "react";

const useEditableBoard = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const moveCardColumn = useMutation(
    (
      { storage },
      cardId: string,
      prevColumn: TColumnType,
      nextColumn: TColumnType,
      nextCardId?: string // 뒤에 올 카드 아이디
    ) => {
      const board = storage.get("board");

      if (prevColumn === nextColumn && nextCardId !== undefined) {
        const container = board.get(prevColumn);
        if (container === undefined) {
          return;
        }

        const prevIdx = container.findIndex((val) => val === cardId);
        const nextIdx = container.findIndex((val) => val === nextCardId);
        container.move(prevIdx, nextIdx);

        return;
      }

      const prevContainer = board.get(prevColumn);
      const nextContainer = board.get(nextColumn);

      if (!prevContainer || !nextContainer) {
        return;
      }

      const index = prevContainer.findIndex((val) => val === cardId);
      prevContainer.delete(index);

      let targetIdx = nextContainer.length;
      if (nextCardId !== undefined) {
        targetIdx = nextContainer.findIndex((val) => val === nextCardId);
      }
      nextContainer.insert(cardId, targetIdx);
    },
    []
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCardId(event.active.id.toString());
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    const activeId = active.id.toString();
    const activeData = active.data.current;
    const activeColumn = activeData!.column as TColumnType;

    if (!over || active.id === over.id) {
      return;
    }

    const overId = over.id.toString();
    if (overId.startsWith("column-")) {
      // 다른 컬럼 영역에 들어감 -> 컬럼 제일 마지막에 추가
      const overColumn = overId.slice("column-".length) as TColumnType;
      moveCardColumn(activeId, activeColumn, overColumn);
    } else {
      // 다른 컬럼의 "카드 영역"에 들어감 -> 해당 컬럼 앞에 추가
      const overData = over.data.current;
      const overColumn = overData!.column as TColumnType;

      if (overColumn === activeColumn) {
        return;
      }

      moveCardColumn(activeId, activeColumn, overColumn, overId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCardId(null);

    const { active, over } = event;

    const activeId = active.id.toString();
    const activeData = active.data.current;
    const activeColumn = activeData!.column as TColumnType;

    if (over === null) {
      return;
    }

    const overId = over.id.toString();
    if (overId.startsWith("column-")) {
      return;
    }

    const overData = over.data.current;
    const overColumn = overData!.column as TColumnType;

    if (activeColumn !== overColumn) {
      return;
    }

    // 같은 컬럼 내의 카드와 순서 변경
    moveCardColumn(activeId, activeColumn, overColumn, overId);
  };

  return {
    activeCardId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useEditableBoard;
