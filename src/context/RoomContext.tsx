import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "@/store/store";
import {
  TCard,
  TChat,
  TColumnType,
  TMessage,
  TReaction,
  TRoomPhase,
  TTask,
  TUser,
} from "@/types/types";

// 클라이언트 상태 타입

export type ClientTopic = {
  card: TCard;
  reactions: Record<string, TReaction>;
  chats: TChat[];
};

export type ClientRoomState = {
  phase: TRoomPhase;
  board: Record<TColumnType, string[]>;
  cards: Record<string, TCard>;
  topics: ClientTopic[];
  messages: Record<string, TMessage>;
  tasks: Record<string, TTask>;
};

const initialRoomState: ClientRoomState = {
  phase: "REFLECT",
  board: { start: [], stop: [], continue: [] },
  cards: {},
  topics: [],
  messages: {},
  tasks: {},
};

// 서버 → 클라이언트 메시지

type ServerMessage =
  | { type: "STATE_SYNC"; state: ClientRoomState }
  | { type: "PRESENCE_UPDATED"; users: TUser[] }
  | { type: "CARD_ADDED"; card: TCard; column: TColumnType; boardColumn: string[] }
  | { type: "CARD_DELETED"; cardId: string; column: TColumnType; boardColumn: string[] }
  | { type: "CARD_MOVED"; fromCol: TColumnType; fromBoardColumn: string[]; toCol: TColumnType; toBoardColumn: string[] }
  | { type: "CARD_LIKED"; cardId: string; likes: TCard["likes"] }
  | { type: "PHASE_CHANGED"; phase: TRoomPhase }
  | { type: "DISCUSSION_INITIATED"; topics: ClientTopic[] }
  | { type: "DISCUSSION_CLEARED" }
  | { type: "MESSAGE_ADDED"; topicIndex: number; message: TMessage }
  | { type: "TASK_ADDED"; topicIndex: number; task: TTask }
  | { type: "TASK_UPDATED"; taskId: string; content: string }
  | { type: "REACTION_UPDATED"; topicIndex: number; reactions: Record<string, TReaction> }
  | { type: "MEETING_SAVED" }
  | { type: "MEETING_SAVE_ERROR"; message: string };

// 클라이언트 → 서버 메시지

export type ClientMessage =
  | { type: "JOIN_ROOM"; roomId: string; user: TUser }
  | { type: "ADD_CARD"; card: TCard; column: TColumnType }
  | { type: "DELETE_CARD"; cardId: string; column: TColumnType }
  | { type: "MOVE_CARD"; cardId: string; fromCol: TColumnType; toCol: TColumnType; toIndex: number }
  | { type: "LIKE_CARD"; cardId: string; user: TUser }
  | { type: "CANCEL_LIKE_CARD"; cardId: string; userId: string }
  | { type: "CHANGE_PHASE"; phase: TRoomPhase }
  | { type: "ADD_MESSAGE"; topicIndex: number; message: TMessage }
  | { type: "ADD_TASK"; topicIndex: number; task: TTask }
  | { type: "UPDATE_TASK"; taskId: string; content: string }
  | { type: "ADD_REACTION"; topicIndex: number; emoji: TReaction["emoji"]; user: TUser }
  | { type: "REMOVE_REACTION"; topicIndex: number; emojiUnified: string; userId: string }
  | { type: "SAVE_MEETING" };

// Reducer

function reducer(state: ClientRoomState, action: ServerMessage): ClientRoomState {
  switch (action.type) {
    case "STATE_SYNC":
      return action.state;

    case "CARD_ADDED":
      return {
        ...state,
        cards: { ...state.cards, [action.card.id]: action.card },
        board: { ...state.board, [action.column]: action.boardColumn },
      };

    case "CARD_DELETED": {
      const { [action.cardId]: _, ...remainingCards } = state.cards;
      return {
        ...state,
        cards: remainingCards,
        board: { ...state.board, [action.column]: action.boardColumn },
      };
    }

    case "CARD_MOVED":
      return {
        ...state,
        board: {
          ...state.board,
          [action.fromCol]: action.fromBoardColumn,
          [action.toCol]: action.toBoardColumn,
        },
      };

    case "CARD_LIKED":
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.cardId]: { ...state.cards[action.cardId], likes: action.likes },
        },
      };

    case "PHASE_CHANGED":
      return { ...state, phase: action.phase };

    case "DISCUSSION_INITIATED":
      return { ...state, topics: action.topics };

    case "DISCUSSION_CLEARED":
      return { ...state, topics: [], messages: {}, tasks: {} };

    case "MESSAGE_ADDED": {
      const topic = state.topics[action.topicIndex];
      if (!topic) return state;
      const newChats: TChat[] = [...topic.chats, { id: action.message.id, type: "MESSAGE" }];
      return {
        ...state,
        messages: { ...state.messages, [action.message.id]: action.message },
        topics: state.topics.map((t, i) =>
          i === action.topicIndex ? { ...t, chats: newChats } : t
        ),
      };
    }

    case "TASK_ADDED": {
      const topic = state.topics[action.topicIndex];
      if (!topic) return state;
      const newChats: TChat[] = [...topic.chats, { id: action.task.id, type: "TASK" }];
      return {
        ...state,
        tasks: { ...state.tasks, [action.task.id]: action.task },
        topics: state.topics.map((t, i) =>
          i === action.topicIndex ? { ...t, chats: newChats } : t
        ),
      };
    }

    case "TASK_UPDATED":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: { ...state.tasks[action.taskId], content: action.content },
        },
      };

    case "REACTION_UPDATED":
      return {
        ...state,
        topics: state.topics.map((t, i) =>
          i === action.topicIndex ? { ...t, reactions: action.reactions } : t
        ),
      };

    default:
      return state;
  }
}

// Context

type RoomContextValue = {
  state: ClientRoomState;
  others: TUser[];
  isConnected: boolean;
  send: (msg: ClientMessage) => void;
  saveMeeting: (onSuccess?: () => void, onError?: (msg: string) => void) => void;
};

const RoomContext = createContext<RoomContextValue | null>(null);

interface RoomContextProviderProps {
  roomId: string;
  children: React.ReactNode;
}

export function RoomContextProvider({ roomId, children }: RoomContextProviderProps) {
  const user = useAppSelector((state) => state.user.user);

  const [state, dispatch] = useReducer(reducer, initialRoomState);
  const [others, setOthers] = useState<TUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const meetingSavedCbRef = useRef<(() => void) | undefined>(undefined);
  const meetingSaveErrorCbRef = useRef<((msg: string) => void) | undefined>(undefined);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL as string);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "JOIN_ROOM", roomId, user }));
    };

    ws.onmessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data as string) as ServerMessage;

      if (msg.type === "PRESENCE_UPDATED") {
        setOthers(msg.users.filter((u) => u.id !== user.id));
        return;
      }
      if (msg.type === "MEETING_SAVED") {
        meetingSavedCbRef.current?.();
        return;
      }
      if (msg.type === "MEETING_SAVE_ERROR") {
        meetingSaveErrorCbRef.current?.(msg.message);
        return;
      }

      dispatch(msg);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = () => {
      console.error("[WS] Connection error");
    };

    return () => {
      ws.close();
    };
  }, [roomId, user]);

  const send = useCallback((msg: ClientMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const saveMeeting = useCallback(
    (onSuccess?: () => void, onError?: (msg: string) => void) => {
      meetingSavedCbRef.current = onSuccess;
      meetingSaveErrorCbRef.current = onError;
      send({ type: "SAVE_MEETING" });
    },
    [send]
  );

  return (
    <RoomContext.Provider value={{ state, others, isConnected, send, saveMeeting }}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoomContext(): RoomContextValue {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error("useRoomContext must be used within RoomContextProvider");
  return ctx;
}
