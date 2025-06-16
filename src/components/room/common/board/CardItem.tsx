import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EllipsisVerticalIcon, ThumbsUpIcon, XIcon } from "lucide-react";
import { ComponentPropsWithRef } from "react";

interface CardItemProps extends ComponentPropsWithRef<"div"> {}

const CardItem = ({ className, children, ...props }: CardItemProps) => {
  return (
    <Card
      className={cn(className, "w-full px-[.5rem] py-[.7rem] gap-[.5rem]")}
      {...props}
    >
      {children}
    </Card>
  );
};

const Header = ({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <CardHeader className={cn(className, "flex justify-between")} {...props}>
      {children}
    </CardHeader>
  );
};

interface CardItemContentProps {
  title: string;
  content: string;
}

const Content = ({ title, content }: CardItemContentProps) => {
  return (
    <CardContent className="flex flex-col gap-[1rem] px-[.5rem] text-start break-words">
      <div className="font-bold">{title}</div>
      <div>{content}</div>
    </CardContent>
  );
};

const DragHandle = (props: ComponentPropsWithRef<"div">) => {
  return (
    <div className="cursor-grab text-gray-500" {...props}>
      <EllipsisVerticalIcon width="1rem" />
    </div>
  );
};

const DeleteButton = ({
  className,
  onClick,
  ...props
}: ComponentPropsWithRef<"button">) => {
  return (
    <button
      onClick={onClick}
      className={cn(className, "text-gray-500 hover:text-black cursor-pointer")}
      {...props}
    >
      <XIcon width="1rem" />
    </button>
  );
};

const Footer = ({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <CardFooter
      className={cn(className, "text-sm justify-end gap-[1rem]")}
      {...props}
    >
      {children}
    </CardFooter>
  );
};

interface CardItemLikesProps {
  hasLiked: boolean;
  likes: number;
  onClickLikeButton?: () => void;
}

const Likes = ({ hasLiked, likes, onClickLikeButton }: CardItemLikesProps) => {
  const likable = onClickLikeButton !== undefined;
  return (
    <div className="flex gap-[.5rem] items-center">
      <button
        className={cn([
          hasLiked ? "text-black" : "text-gray-500",
          "hover:text-black",
          likable ? "cursor-pointer" : "cursor-default",
        ])}
        disabled={!likable}
        onClick={onClickLikeButton}
      >
        <ThumbsUpIcon width="1rem" fill={hasLiked ? "black" : "none"} />
      </button>
      <p>{likes}</p>
    </div>
  );
};

CardItem.Header = Header;
CardItem.Content = Content;
CardItem.DeleteButton = DeleteButton;
CardItem.DragHandle = DragHandle;
CardItem.Footer = Footer;
CardItem.Likes = Likes;

export default CardItem;
