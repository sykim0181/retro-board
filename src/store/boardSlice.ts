import { TBoard, TCard } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TEditingInfo = {
  board: TBoard;
  card: TCard;
};

type State = {
  editingInfo: TEditingInfo | null;
};

const initialState: State = {
  editingInfo: null,
};

interface SetEditingBoardInterface {
  board: TBoard;
  card: TCard;
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setEditingBoard: (
      state,
      action: PayloadAction<SetEditingBoardInterface>
    ) => {
      state.editingInfo = {
        board: action.payload.board,
        card: action.payload.card,
      };
    },
    resetEditingInfo: (state) => {
      state.editingInfo = null;
    },
  },
});

export const { setEditingBoard, resetEditingInfo } = boardSlice.actions;

export default boardSlice;
