import { getAiSummary } from "@/api/getAiSummary";
import { TMeeting } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import ReactMarkDown from "react-markdown";
import remarkBreaks from "remark-breaks";

interface AiSummaryDialogProps {
  meeting: TMeeting;
  children: ReactNode;
}

const AiSummaryDialog = (props: AiSummaryDialogProps) => {
  const { meeting, children } = props;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["summary", meeting.id],
    queryFn: () => getAiSummary(meeting),
    staleTime: Infinity,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-dvh grid-rows-[auto_1fr]">
        <DialogHeader>
          <DialogTitle>AI 요약</DialogTitle>
          <DialogDescription>
            구글 Gemini 2.0 Flash 모델을 사용한 요약 결과입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto prose">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <p>에러가 발생하였습니다.</p>
          ) : (
            <ReactMarkDown remarkPlugins={[remarkBreaks]}>
              {`${data}`}
            </ReactMarkDown>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiSummaryDialog;
