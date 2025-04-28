import { shallow } from "@liveblocks/client";
import { useStorage } from "@liveblocks/react/suspense";
import {
  LucideIcon,
  MessageSquareTextIcon,
  SquarePenIcon,
  VoteIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
    url: "discuss",
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

  const topicCards = useStorage(
    (root) => root.topics.map((topic) => topic.card),
    shallow
  );

  const { phase, changePhase, canChangePhase } = usePhase();

  const navigate = useNavigate();

  const isAccessibleItem = useCallback(
    (navItem: TItem) => {
      if (navItem.phase === undefined) {
        return true;
      }

      return canChangePhase(navItem.phase);
    },
    [canChangePhase]
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
          const newSubitems = topicCards.map((card, idx) => {
            const item: TItem = {
              title: card.title,
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
  }, [phase, topicCards, isAccessibleItem]);

  const onClickMenuItem = useCallback(
    (e: React.MouseEvent, navItem: TItem) => {
      if (navItem.disabled === true) {
        e.preventDefault();
        return;
      }

      if (isOwnerOfRoom) {
        if (navItem.phase === "DISCUSS" && phase === "VOTE") {
          // VOTE -> DISCUSS
          changePhase("DISCUSS");
        } else if (navItem.phase === "VOTE" && phase === "REFLECT") {
          // REFLECT -> VOTE
          changePhase("VOTE");
        }
      }

      if (navItem.url) {
        navigate(`/room/${room.id}/${navItem.url}`);
      }
    },
    [phase, isOwnerOfRoom, navigate, changePhase]
  );
  return {
    items,
    onClickMenuItem,
  };
};

export default useRoomSidebarContent;
