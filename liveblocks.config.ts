// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
import { TRoomPhase } from "@/types/types";
import { Storage } from "./src/types/liveblocks";

declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      name: string;
      // Example, real-time cursor coordinates
      // cursor: { x: number; y: number };
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: Storage;

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        // Example properties, for useSelf, useUser, useOthers, etc.
        // name: string;
        // avatar: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: { type: "PHASE_CHANGE"; phase: TRoomPhase };
    // Example has two events, using a union
    // | { type: "PLAY" }
    // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}

export {};
