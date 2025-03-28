import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  setEditingBoard,
  startEditingBoard,
  stopEditingBoard,
  useAppDispatch,
  useAppSelector,
} from "@/lib/boardStore";
import { TCard, TColumnType } from "@/types/types";

const useBoard = () => {
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) => state.board);
  const editingInfo = useAppSelector((state) => state.editingInfo);

  const currentBoard = editingInfo !== null ? editingInfo.board : board;

  const handleDragStart = (event: DragStartEvent) => {
    const card = event.active.data.current as TCard;
    dispatch(startEditingBoard({ card }));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const card = active.data.current as TCard;

    if (editingInfo === null) {
      return;
    }
    const editingBoard = editingInfo.board;
    const editingCard = editingInfo.card;

    if (card.id !== editingCard.id) {
      return;
    }

    const activeColumn = editingCard.category;
    const activeContainer = editingBoard[activeColumn];

    if (!over || active.id === over.id) {
      return;
    }

    const overId = over.id as string;
    if (overId.startsWith("column-")) {
      // 다른 컬럼 영역에 들어감 -> 컬럼 제일 마지막에 추가
      const overColumn = overId.slice("column-".length) as TColumnType;
      const overContainer = editingBoard[overColumn];

      const newCard: TCard = {
        ...card,
        category: overColumn,
      };
      const newEditingBoard = {
        ...editingBoard,
        [activeColumn]: activeContainer.filter((value) => value.id !== card.id),
        [overColumn]: [...overContainer, newCard],
      };
      dispatch(
        setEditingBoard({
          board: newEditingBoard,
          card: newCard,
        })
      );
    } else {
      // 다른 컬럼의 "카드 영역"에 들어감 -> 해당 컬럼 앞에 추가
      const overCard = over.data.current as TCard;
      const overColumn = overCard.category;

      if (overColumn === activeColumn) {
        return;
      }

      const overContainer = editingBoard[overColumn];
      const overIndex = overContainer.findIndex(
        (value) => value.id === overCard.id
      );

      const newCard: TCard = {
        ...card,
        category: overColumn,
      };
      const newEditingBoard = {
        ...editingBoard,
        [activeColumn]: activeContainer.filter((value) => value.id !== card.id),
        [overColumn]: [
          ...overContainer.slice(0, overIndex),
          newCard,
          ...overContainer.slice(overIndex),
        ],
      };
      dispatch(
        setEditingBoard({
          board: newEditingBoard,
          card: newCard,
        })
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const card = active.data.current as TCard;

    if (editingInfo === null) {
      return;
    }
    const editingBoard = editingInfo.board;
    const editingCard = editingInfo.card;

    if (card.id !== editingCard.id) {
      return;
    }

    const activeColumn = editingCard.category;
    const activeContainer = editingBoard[activeColumn];
    const activeIndex = activeContainer.findIndex(
      (value) => value.id === card.id
    );

    if (over && !(over.id as string).startsWith("column-")) {
      const overCard = over.data.current as TCard;
      const overColumn = overCard.category;
      if (activeColumn === overColumn) {
        // 같은 컬럼 내의 카드와 순서 변경
        const overIndex = editingBoard[overColumn].findIndex(
          (value) => value.id === overCard.id
        );

        const newBoard = {
          ...editingBoard,
          [activeColumn]: arrayMove(
            editingBoard[activeColumn],
            activeIndex,
            overIndex
          ),
        };
        dispatch(stopEditingBoard({ board: newBoard }));
        return;
      }
    }
    dispatch(stopEditingBoard({}));
  };

  return {
    currentBoard,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useBoard;
