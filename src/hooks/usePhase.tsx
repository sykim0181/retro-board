import {
  shallow,
  useBroadcastEvent,
  useMutation,
  useStorage,
} from "@liveblocks/react/suspense";
import { TRoomPhase } from "@/types/types";
import { useCallback } from "react";
import { Topic } from "@/types/liveblocks";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";

const usePhase = () => {
  const broadcast = useBroadcastEvent();

  const phase = useStorage((root) => root.phase);
  const hasCard = useStorage((root) => root.cards.size > 0, shallow);

  const initiateDiscussion = useMutation(({ storage }) => {
    // cards -> topic 리스트
    const cards = storage.get("cards");
    const cardArr = Array.from(cards.values());
    const topics = cardArr.map((card) => {
      const topic: Topic = new LiveObject({
        card: card.toObject(),
        reactions: new LiveMap(),
        chats: new LiveList([]),
      });
      return topic;
    });
    const newTopics = new LiveList(topics);
    storage.set("topics", newTopics);
  }, []);

  const clearDiscussion = useMutation(({ storage }) => {
    storage.set("topics", new LiveList([]));
    storage.set("tasks", new LiveMap());
    storage.set("messages", new LiveMap());
  }, []);

  const changePhase = useMutation(
    ({ storage }, phase: TRoomPhase) => {
      const curPhase = storage.get("phase"); // 기존 phase

      // 바뀔 phase
      switch (phase) {
        case "REFLECT": {
          if (curPhase === "DISCUSS" || curPhase === "END") {
            clearDiscussion();
          }
          break;
        }
        case "VOTE": {
          if (curPhase === "DISCUSS" || curPhase === "END") {
            clearDiscussion();
          }
          break;
        }
        case "DISCUSS": {
          initiateDiscussion();
          break;
        }
        case "END": {
          break;
        }
        default: {
          break;
        }
      }
      storage.set("phase", phase); // phase 변경

      broadcast({ type: "PHASE_CHANGE", phase });
    },
    [broadcast, initiateDiscussion, clearDiscussion]
  );

  const canChangePhase = useCallback(
    (targetPhase: TRoomPhase): boolean => {
      const currentPhase = phase;

      if (targetPhase === "REFLECT") {
        return true;
      }
      if (targetPhase === "VOTE") {
        return hasCard;
      }
      if (targetPhase === "DISCUSS") {
        if (currentPhase === "REFLECT") {
          return false;
        }
        return hasCard;
      }
      // targetPhase === "END"
      return true;
    },
    [phase, hasCard]
  );

  return {
    phase,
    changePhase,
    canChangePhase,
  };
};

export default usePhase;
