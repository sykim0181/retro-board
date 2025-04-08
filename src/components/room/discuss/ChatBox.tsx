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
  taskId: string;
}

const ChatBox = (props: ChatBoxProps) => {
  const { taskId } = props;

  return (
    <Card className="w-full h-full lg:w-[350px] gap-0">
      <CardHeader className="p-[1rem]">Discussion</CardHeader>
      <Separator />
      <CardContent className="flex-1 p-[1rem] flex flex-col overflow-y-hidden">
        <ChatList taskId={taskId} />
      </CardContent>
      <Separator />
      <CardFooter className="p-[1rem] gap-[1rem]">
        <ChatInput taskId={taskId} />
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
