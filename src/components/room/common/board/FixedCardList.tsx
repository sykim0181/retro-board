import useCard from "@/hooks/useCard";
import { TColumnType } from "@/types/types";
import { ComponentProps } from "react";
import { useBoardContext } from "./Board";
import CardItem from "./CardItem";
import BoardCardLikes from "./BoardCardLikes";

interface FixedCardListProps extends ComponentProps<"div"> {
  columnType: TColumnType;
  cardIdList: string[];
}

const FixedCardList = (props: FixedCardListProps) => {
  const { columnType, cardIdList, className } = props;

  return (
    <div className={className}>
      {cardIdList.map((cardId) => (
        <FixedCard key={cardId} cardId={cardId} cardColumn={columnType} />
      ))}
    </div>
  );
};

interface FixedCardProps {
  cardId: string;
  cardColumn: TColumnType;
}

const FixedCard = (props: FixedCardProps) => {
  const { cardId, cardColumn } = props;

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
          <BoardCardLikes cardId={cardId} cardColumn={cardColumn} />
        </CardItem.Footer>
      )}
    </CardItem>
  );
};

export default FixedCardList;
