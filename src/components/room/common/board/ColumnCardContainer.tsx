import React, { useMemo } from "react";
import CardItem from "./CardItem";
import { TColumnType } from "@/types/types";
import { useBoardContext } from "./Board";
import EditableCardListWrapper from "./EditableCardListWrapper";

interface ColumnCardsProps {
  columnType: TColumnType;
  cardIdList: string[];
}

const ColumnCardContainer = (props: ColumnCardsProps) => {
  const { columnType, cardIdList } = props;

  const { editable } = useBoardContext();

  const cardList = useMemo(
    () =>
      cardIdList.map((cardId) => (
        <CardItem key={cardId} cardId={cardId} column={columnType} />
      )),
    [columnType, cardIdList]
  );

  const style = "flex flex-col gap-[1rem] h-full";

  return editable ? (
    <EditableCardListWrapper
      columnType={columnType}
      cardIdList={cardIdList}
      className={style}
    >
      {cardList}
    </EditableCardListWrapper>
  ) : (
    <div className={style}>{cardList}</div>
  );
};

export default React.memo(ColumnCardContainer);
