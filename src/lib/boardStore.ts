import { TCard, TColumnType } from "@/types/types";
import { createClient } from "@liveblocks/client";
import { liveblocksEnhancer } from "@liveblocks/redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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

type Column = {
  cards: TCard[];
};

export type State = {
  liveblocks: LiveblocksState | null;
  start: Column;
  end: Column;
  continue: Column;
  typingState: TypingState;
};

const initialColumnState: Column = {
  cards: [],
};

const initialState: State = {
  liveblocks: null,
  start: initialColumnState,
  end: initialColumnState,
  continue: initialColumnState,
  typingState: {
    isTyping: false,
    column: null,
  },
};

interface AddCardInterface {
  type: TColumnType;
  card: TCard;
}

interface DeleteCardInterface {
  type: TColumnType;
  cardId: string;
}

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<AddCardInterface>) => {
      switch (action.payload.type) {
        case "START": {
          state.start.cards.push(action.payload.card);
          break;
        }
        case "END": {
          state.end.cards.push(action.payload.card);
          break;
        }
        case "CONTINUE": {
          state.continue.cards.push(action.payload.card);
          break;
        }
        default: {
          break;
        }
      }
      state.typingState.column = null;
      state.typingState.isTyping = false;
    },
    deleteCard: (state, action: PayloadAction<DeleteCardInterface>) => {
      const cardId = action.payload.cardId;
      switch (action.payload.type) {
        case "START": {
          const prevCards = state.start.cards;
          console.log("prevCards", prevCards);
          state.start.cards = prevCards.filter((card) => card.id !== cardId);
          console.log("curCards", state.start.cards);
          break;
        }
        case "END": {
          const prevCards = state.end.cards;
          state.end.cards = prevCards.filter((card) => card.id !== cardId);
          break;
        }
        case "CONTINUE": {
          const prevCards = state.continue.cards;
          state.continue.cards = prevCards.filter((card) => card.id !== cardId);
          break;
        }
        default: {
          break;
        }
      }
    },
    setTypingState: (state, action: PayloadAction<TypingState>) => {
      state.typingState.isTyping = action.payload.isTyping;
      state.typingState.column = action.payload.column;
    },
  },
});

export const { addCard, deleteCard, setTypingState } = slice.actions;

const store = configureStore({
  reducer: slice.reducer,
  enhancers: (getDefaultEnhancers) => {
    const defaultEnhancers = getDefaultEnhancers();

    const newLiveblocksEnhancer = liveblocksEnhancer<State>({
      client,
      storageMapping: { start: true, end: true, continue: true },
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
