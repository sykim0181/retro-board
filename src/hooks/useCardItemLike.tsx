import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useMemo } from "react";
import { TLike } from "@/types/types";
import { getUser } from "@/utils";

interface useCardItemLikeProps {
  cardId: string;
}

const useCardItemLike = (props: useCardItemLikeProps) => {
  const { cardId } = props;

  const likes = useStorage((root) => root.tasks.get(cardId)?.card.likes) ?? [];

  const hasLiked = useMemo(() => {
    const user = getUser();
    return likes.some((like) => like.user.name === user.name);
  }, [likes]);

  const onClickLikeButton = useMutation(
    ({ storage }) => {
      const card = storage.get("tasks").get(cardId)?.get("card");

      if (!card) {
        return;
      }

      const user = getUser();

      if (hasLiked) {
        card.set(
          "likes",
          likes.filter((like) => like.user.name !== user.name)
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
