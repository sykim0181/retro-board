import AiSummaryDialog from "@/components/summary/AiSummaryDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useSummary from "@/hooks/useSummary";
import { TMeeting } from "@/types/types";
import { useOutletContext } from "react-router";

const Summary = () => {
  const { meeting } = useOutletContext<{ meeting: TMeeting }>();

  const { name, topics, taskCnt, groupedTasks, formattedDate } = useSummary({
    meeting,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center">
      <section className="flex flex-col gap-[1.5rem] items-center p-[2rem]">
        <h1 className="text-[2rem]">{name}</h1>
        <div className="flex flex-row">
          <span className="text-gray-500">{formattedDate}</span>
        </div>
        <div className="flex flex-row gap-1">
          <div className="flex flex-col items-center p-[0.5rem] w-[100px]">
            <div className="text-[2rem]">{topics.length}</div>
            <div className="text-[0.8rem] text-gray-500">TOPICS</div>
          </div>
          <div className="flex flex-col items-center p-[0.5rem] w-[100px]">
            <div className="text-[2rem]">{taskCnt}</div>
            <div className="text-[0.8rem] text-gray-500">NEW TASK</div>
          </div>
        </div>

        <div className="print:hidden grid grid-cols-2 gap-[1rem]">
          <Button className="" onClick={handlePrint}>PDF 변환</Button>
          <AiSummaryDialog meeting={meeting}>
            <Button className="">AI 요약</Button>
          </AiSummaryDialog>
        </div>
      </section>

      <Separator className="my-[1rem]" />

      <section className="p-[2rem]">
        <h2 className="text-center text-[1.5rem]">New Task</h2>
        <div className="flex flex-col gap-[3.5rem] items-center mt-[3rem]">
          {Array.from(groupedTasks.keys()).map((userName) => {
            const tasks = groupedTasks.get(userName)!;
            return (
              <div
                key={userName}
                className="flex flex-col gap-[2rem] items-center"
              >
                <div className="text-[1.2rem]">{userName}</div>
                <div className="font-bold text-[0.9rem]">
                  {`${tasks.length} New Task`}
                </div>
                <div className="flex flex-col gap-[1.5rem]">
                  {tasks.map((task, idx) => (
                    <Card
                      key={`task-${idx}`}
                      className="w-[350px] min-h-[100px] p-[1rem]"
                    >
                      <CardContent>{task.content}</CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Separator className="my-[1rem]" />

      <section className="p-[2rem]">
        <h2 className="text-center text-[1.5rem]">Topics</h2>
        <div className="flex flex-col gap-[3.5rem] items-center mt-[3rem]">
          {topics.map((topic) => (
            <div
              key={topic.card.id}
              className="flex flex-col gap-[2rem] items-center"
            >
              <h3 className="font-bold">{topic.card.title}</h3>
              <span>{`좋아요: ${topic.card.likes.length}`}</span>
              <Card className="w-[350px] min-h-[100px] p-[1rem]">
                <div>{topic.card.content}</div>
                <CardFooter>
                  <span className="text-[0.8rem] text-gray-500">
                    {topic.card.category}
                  </span>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Summary;
