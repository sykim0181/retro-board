import { LiveList, LiveMap, LiveObject, shallow } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import {
  LucideIcon,
  MessageSquareTextIcon,
  SquarePenIcon,
  VoteIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Task } from "@/types/liveblocks";
import { TRoom, TRoomPhase } from "@/types/types";
import usePhase from "./usePhase";

export type TItem = {
  title: string;
  phase?: TRoomPhase;
  url?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  items?: Omit<TItem, "items">[];
};

const initialItems: TItem[] = [
  {
    title: "Reflect",
    phase: "REFLECT",
    url: "reflect",
    icon: SquarePenIcon,
  },
  {
    title: "Vote",
    phase: "VOTE",
    url: "vote",
    icon: VoteIcon,
  },
  {
    title: "Discuss",
    phase: "DISCUSS",
    icon: MessageSquareTextIcon,
  },
];

interface useRoomSidebarContentProps {
  room: TRoom;
  isOwnerOfRoom: boolean;
}

const useRoomSidebarContent = (props: useRoomSidebarContentProps) => {
  const { room, isOwnerOfRoom } = props;

  const [items, setItems] = useState<TItem[]>(initialItems);

  const taskCards = useStorage(
    (root) => root.tasks.map((task) => task.card),
    shallow
  );
  const hasCard = useStorage((root) => root.cards.size > 0, shallow);

  const { phase, changePhase } = usePhase();

  const navigate = useNavigate();

  const isAccessibleItem = useCallback(
    (navItem: TItem) => {
      if (navItem.phase === undefined) {
        return true;
      }

      // 룸 주인은 phase와 관계 없이 모든 페이지 접근 가능
      if (isOwnerOfRoom) {
        // 카드가 하나도 없으면 vote, discuss 불가
        if (
          (navItem.phase === "DISCUSS" || navItem.phase === "VOTE") &&
          !hasCard
        ) {
          return false;
        }

        if (navItem.phase === "DISCUSS" && phase !== "VOTE") {
          return false;
        }

        return true;
      }

      // 그외는 현재 단계(phase)에 해당하는 페이지만 접근 가능
      if (navItem.phase === phase) {
        return true;
      }
      return false;
    },
    [isOwnerOfRoom, phase, hasCard]
  );

  useEffect(() => {
    const newItems = initialItems.map((item) => {
      const isAccessible = isAccessibleItem(item);
      let newItem: TItem = {
        ...item,
        disabled: !isAccessible,
      };

      if (item.phase === "DISCUSS") {
        if (phase === "DISCUSS") {
          // DISCUSS 단계 -> 서브아이템 추가
          const newSubitems = taskCards.map((card, idx) => {
            const item: TItem = {
              title: card.content,
              url: `discuss/${idx + 1}`,
            };
            return item;
          });

          newItem = {
            ...newItem,
            disabled: true,
            items: newSubitems,
          };
        }
      }
      return newItem;
    });

    setItems(newItems);
  }, [phase, taskCards, isAccessibleItem]);

  const initiateVote = () => {
    changePhase("VOTE");
  };

  const initiateDiscussion = useMutation(({ storage }) => {
    // cards -> task 리스트
    const cards = storage.get("cards");
    const cardArr = Array.from(cards.values());
    const tasks = cardArr.map((card) => {
      const task: Task = new LiveObject({
        card: card.toObject(),
        reactions: new LiveMap(),
        chats: new LiveList([]),
      });
      return task;
    });
    const newTasks = new LiveList(tasks);
    storage.set("tasks", newTasks);
    changePhase("DISCUSS");
  }, []);

  const onClickMenuItem = useCallback(
    (e: React.MouseEvent, navItem: TItem) => {
      if (navItem.disabled === true) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (isOwnerOfRoom) {
        if (navItem.phase === "DISCUSS" && phase === "VOTE") {
          // VOTE -> DISCUSS
          initiateDiscussion();
          navigate(`/room/${room.id}/discuss/1`);
        } else if (navItem.phase === "VOTE" && phase === "REFLECT") {
          // REFLECT -> VOTE
          initiateVote();
        }
      }
    },
    [phase, isOwnerOfRoom, initiateDiscussion, initiateVote, navigate]
  );
  return {
    items,
    onClickMenuItem,
  };
};

export default useRoomSidebarContent;
