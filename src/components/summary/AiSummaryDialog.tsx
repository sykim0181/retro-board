import { getAiSummary } from "@/api/getAiSummary";
import { SummaryResult, TMeeting } from "@/types/types";
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

interface AiSummaryDialogProps {
  meeting: TMeeting;
  children: ReactNode;
}

const SECTIONS: { key: keyof SummaryResult; label: string }[] = [
  { key: "keyPoints", label: "핵심 결정사항" },
  { key: "commonConcerns", label: "공감대 형성 내용" },
  { key: "issues", label: "문제점 / 우려사항" },
  { key: "implicitIssues", label: "암시적 이슈" },
  { key: "followUps", label: "후속 주제 / 개선 방향" },
];

const SummarySection = ({ label, items }: { label: string; items: string[] }) => {
  if (items.length === 0) return null;
  return (
    <section>
      <h3 className="font-semibold text-[0.95rem] mb-1">{label}</h3>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[0.9rem] text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

const AiSummaryDialog = (props: AiSummaryDialogProps) => {
  const { meeting, children } = props;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["summary", meeting.id],
    queryFn: () => getAiSummary(meeting),
    staleTime: Infinity,
    initialData: meeting.summary,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-h-[500px] max-h-dvh grid-rows-[auto_1fr]">
        <DialogHeader>
          <DialogTitle>AI 요약</DialogTitle>
          <DialogDescription>
            구글 Gemini 모델을 사용한 요약 결과입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto space-y-5 pr-1">
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : isError ? (
            <p className="text-red-500">에러가 발생하였습니다.</p>
          ) : data ? (
            SECTIONS.map(({ key, label }) => (
              <SummarySection key={key} label={label} items={data[key]} />
            ))
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiSummaryDialog;
