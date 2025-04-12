import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useMemo } from "react";
import { TLike } from "@/types/types";
import { getUser } from "@/utils";

interface useCardItemLikeProps {
  cardId: string;
}

const useCardItemLike = (props: useCardItemLikeProps) => {
  const { cardId } = props;

  const likes = useStorage((root) => root.cards.get(cardId)?.likes) ?? [];

  const hasLiked = useMemo(() => {
    const user = getUser();
    return likes.some((like) => like.user.id === user.id);
  }, [likes]);

  const onClickLikeButton = useMutation(
    ({ storage }) => {
      const card = storage.get("cards").get(cardId);

      if (!card) {
        return;
      }

      const user = getUser();

      if (hasLiked) {
        card.set(
          "likes",
          likes.filter((like) => like.user.id !== user.id)
        );
      } else {
        const newLike: TLike = {
          user,
        };
        card.set("likes", [...likes, newLike]);
      }
    },
    [hasLiked, likes]
  );

  return {
    likes,
    hasLiked,
    onClickLikeButton,
  };
};

export default useCardItemLike;
