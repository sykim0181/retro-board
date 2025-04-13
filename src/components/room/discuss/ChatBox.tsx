import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

interface ChatBoxProps {
  taskIdx: number;
}

const ChatBox = (props: ChatBoxProps) => {
  const { taskIdx } = props;

  const chatListRef = useRef<HTMLUListElement>(null);

  return (
    <Card className="w-full h-full lg:w-[350px] gap-0">
      <CardHeader className="p-[1rem]">Discussion</CardHeader>
      <Separator />
      <CardContent className="flex-1 p-[1rem] flex flex-col overflow-y-hidden">
        <ChatList taskIdx={taskIdx} ref={chatListRef} />
      </CardContent>
      <Separator />
      <CardFooter className="p-[1rem] gap-[1rem]">
        <ChatInput taskIdx={taskIdx} chatListRef={chatListRef} />
      </CardFooter>
    </Card>
  );
};

export default React.memo(ChatBox);
