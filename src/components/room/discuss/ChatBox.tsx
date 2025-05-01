import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MessageInput from "./MessageInput";
import ChatList from "./ChatList";
import { BadgePlusIcon } from "lucide-react";
import useChatBox from "@/hooks/useChatBox";

interface ChatBoxProps {
  topicIdx: number;
}

const ChatBox = (props: ChatBoxProps) => {
  const { topicIdx } = props;

  const chatListRef = useRef<HTMLUListElement>(null);
  const { addTask } = useChatBox({ topicIdx });

  return (
    <Card className="w-full h-full lg:w-[350px] gap-0">
      <CardHeader className="p-[1rem]">Discussion</CardHeader>
      <Separator />
      <CardContent className="flex-1 p-[1rem] flex flex-col overflow-y-hidden">
        <ChatList topicIdx={topicIdx} ref={chatListRef} />
      </CardContent>
      <Separator />
      <CardFooter className="flex-col">
        <MessageInput topicIdx={topicIdx} chatListRef={chatListRef} />
        <Separator />
        <button
          className="w-full flex justify-center items-center py-[0.5rem] cursor-pointer hover:bg-gray-100"
          onClick={addTask}
        >
          <span className="text-[0.9rem]">Task</span>
          <BadgePlusIcon height={"1.2rem"} />
        </button>
      </CardFooter>
    </Card>
  );
};

export default React.memo(ChatBox);
