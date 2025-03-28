import { createClient } from "@liveblocks/client";
import { liveblocksEnhancer } from "@liveblocks/redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TBoard, TCard, TColumnType } from "@/types/types";

/* liveblocks client */
const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY,
});

type TypingState = {
  isTyping: boolean;
  column: TColumnType | null;
};

export type User = {
  presence?: {
    typingState: TypingState;
  };
};

type LiveblocksState = {
  others: User[];
};

type EditingInfo = {
  board: TBoard;
  card: TCard;
};

type State = {
  liveblocks: LiveblocksState | null;
  board: TBoard;
  editingInfo: EditingInfo | null;
  typingState: TypingState;
};

const initialBoard = {
  start: [],
  end: [],
  continue: [],
};

const initialState: State = {
  liveblocks: null,
  board: initialBoard,
  editingInfo: null,
  typingState: {
    isTyping: false,
    column: null,
  },
};

/* Reducer Interface */
interface AddCardInterface {
  card: TCard;
}

interface DeleteCardInterface {
  card: TCard;
}

interface SetIsTypingTrueInterface {
  column: TColumnType;
}

interface StartEditingBoardInterface {
  card: TCard;
}

interface SetEditingBoardInterface {
  board: TBoard;
  card: TCard;
}

interface StopEditingBoardInterface {
  board?: TBoard;
}

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    /* 카드 추가 */
    addCard: (state, action: PayloadAction<AddCardInterface>) => {
      const card = action.payload.card;
      const column = card.category;
      state.board = {
        ...state.board,
        [column]: [...state.board[column], card],
      };
      resetTypingState();
    },
    /* 카드 삭제 */
    deleteCard: (state, action: PayloadAction<DeleteCardInterface>) => {
      const card = action.payload.card;
      const cardId = card.id;
      const column = card.category;
      state.board = {
        ...state.board,
        [column]: state.board[column].filter((value) => value.id !== cardId),
      };
    },
    /* 타이핑 상태 리셋 */
    resetTypingState: (state) => {
      state.typingState.column = null;
      state.typingState.isTyping = false;
    },
    /* 타이핑 상태 설정 */
    setIsTypingTrue: (
      state,
      action: PayloadAction<SetIsTypingTrueInterface>
    ) => {
      state.typingState.isTyping = true;
      state.typingState.column = action.payload.column;
    },
    /* 보드 편집(카드 드래그) 시작 */
    startEditingBoard: (
      state,
      action: PayloadAction<StartEditingBoardInterface>
    ) => {
      state.editingInfo = {
        board: state.board,
        card: action.payload.card,
      };
    },
    /* 편집 중 보드 설정 */
    setEditingBoard: (
      state,
      action: PayloadAction<SetEditingBoardInterface>
    ) => {
      state.editingInfo = {
        board: action.payload.board,
        card: action.payload.card,
      };
    },
    /* 보드 편집(카드 드래그) 끝 */
    stopEditingBoard: (
      state,
      action: PayloadAction<StopEditingBoardInterface>
    ) => {
      if (action.payload.board) {
        state.board = action.payload.board;
      } else if (state.editingInfo) {
        state.board = state.editingInfo.board;
      }
      state.editingInfo = null;
    },
  },
});

export const {
  addCard,
  deleteCard,
  resetTypingState,
  setIsTypingTrue,
  startEditingBoard,
  setEditingBoard,
  stopEditingBoard,
} = slice.actions;

const store = configureStore({
  reducer: slice.reducer,
  enhancers: (getDefaultEnhancers) => {
    const defaultEnhancers = getDefaultEnhancers();

    const newLiveblocksEnhancer = liveblocksEnhancer<State>({
      client,
      storageMapping: { board: true },
      presenceMapping: { typingState: true },
    });

    return defaultEnhancers.concat(newLiveblocksEnhancer);
  },
});

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default store;
