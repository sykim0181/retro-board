import useCard from "@/hooks/useCard";
import { TColumnType } from "@/types/types";
import { useSortable } from "@dnd-kit/sortable";
import CardItem from "./CardItem";
import { useBoardContext } from "./Board";
import { useAppSelector } from "@/store/store";
import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";

interface BoardCardProps {
  cardId: string;
  cardColumn: TColumnType;
}

const BoardCard = (props: BoardCardProps) => {
  const { editable } = useBoardContext();

  return editable ? <EditableCard {...props} /> : <FixedCard {...props} />;
};

interface CommonCardProps extends BoardCardProps {}

const EditableCard = ({ cardId, cardColumn }: CommonCardProps) => {
  const { title, content, deleteCard } = useCard({
    cardId,
    cardColumn,
  });

  const { showLikes } = useBoardContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: cardId,
    data: {
      column: cardColumn,
    },
  });

  const styleByDrag = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <CardItem ref={setNodeRef} style={styleByDrag} {...attributes}>
      <CardItem.Header>
        <CardItem.DragHandle ref={setActivatorNodeRef} {...listeners} />
        <CardItem.DeleteButton onClick={deleteCard} />
      </CardItem.Header>
      <CardItem.Content title={title ?? ""} content={content ?? ""} />
      {showLikes && (
        <CardItem.Footer>
          <CardItemLikes cardId={cardId} cardColumn={cardColumn} />
        </CardItem.Footer>
      )}
    </CardItem>
  );
};

const FixedCard = ({ cardId, cardColumn }: CommonCardProps) => {
  const { title, content } = useCard({
    cardId,
    cardColumn,
  });
  const { showLikes } = useBoardContext();

  return (
    <CardItem>
      <CardItem.Content title={title ?? ""} content={content ?? ""} />
      {showLikes && (
        <CardItem.Footer>
          <CardItemLikes cardId={cardId} cardColumn={cardColumn} />
        </CardItem.Footer>
      )}
    </CardItem>
  );
};

const CardItemLikes = ({ cardId, cardColumn }: CommonCardProps) => {
  const { likes, likeCard, cancelLikeCard } = useCard({ cardId, cardColumn });
  const user = useAppSelector((state) => state.user.user);
  const { votable } = useBoardContext();

  if (!likes) {
    return null;
  }

  const hasLiked = useMemo(() => {
    return likes.some((like) => like.user.id === user.id);
  }, [likes, user]);

  const onClickLikeButton = () => {
    if (hasLiked) {
      cancelLikeCard(user);
    } else {
      likeCard(user);
    }
  };

  return (
    <CardItem.Likes
      likes={likes.length}
      hasLiked={hasLiked}
      onClickLikeButton={votable ? onClickLikeButton : undefined}
    />
  );
};

export default BoardCard;
