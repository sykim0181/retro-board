import React, { useMemo } from "react";
import { TColumnType } from "@/types/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useCard from "@/hooks/useCard";
import CardItemLike from "./CardItemLike";
import { useBoardContext } from "./Board";
import EditableCardItem from "./EditableCardItem";

interface CardProps {
  cardId: string;
  column: TColumnType;
}

const CardItem = (props: CardProps) => {
  const { cardId, column } = props;

  const { editable, showLikes } = useBoardContext();
  const { title, content } = useCard({ cardId });

  if (!content) {
    return null;
  }

  const cardContent = useMemo(
    () => (
      <>
        <CardContent 
          className="flex flex-col gap-[1rem] px-[.5rem] text-start break-words"
        >
          <div className="font-bold">{title}</div>
          <div>{content}</div>
        </CardContent>
        {showLikes && (
          <CardFooter className="text-sm justify-end gap-[1rem]">
            <CardItemLike cardId={cardId} />
          </CardFooter>
        )}
      </>
    ),
    [cardId, content, showLikes]
  );

  const wrapperStyle = "w-full px-[.5rem] py-[.7rem] gap-[.5rem]";

  return editable ? (
    <EditableCardItem
      className={wrapperStyle}
      cardId={cardId}
      cardColumn={column}
    >
      {cardContent}
    </EditableCardItem>
  ) : (
    <Card className={wrapperStyle}>{cardContent}</Card>
  );
};

export default React.memo(CardItem);
