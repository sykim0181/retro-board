import { getAiSummary } from "@/api/getAiSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { SummaryResult, TMeeting } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

interface AiSummaryProps {
  meeting: TMeeting;
}

const SECTIONS: { key: keyof SummaryResult; label: string }[] = [
  { key: "keyPoints", label: "핵심 결정사항" },
  { key: "commonConcerns", label: "공감대 형성 내용" },
  { key: "issues", label: "문제점 / 우려사항" },
  { key: "implicitIssues", label: "암시적 이슈" },
  { key: "followUps", label: "후속 주제 / 개선 방향" },
];

const AiSummarySkeleton = () => (
  <div className="flex flex-col gap-[2rem]">
    {SECTIONS.map(({ key }) => (
      <div key={key} className="flex flex-col gap-[0.5rem]">
        <Skeleton className="h-[1.1rem] w-[8rem]" />
        <Skeleton className="h-[0.9rem] w-full" />
        <Skeleton className="h-[0.9rem] w-[90%]" />
        <Skeleton className="h-[0.9rem] w-[80%]" />
      </div>
    ))}
  </div>
);

const AiSummary = (props: AiSummaryProps) => {
  const { meeting } = props;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["summary", meeting.id],
    queryFn: () => getAiSummary(meeting),
    staleTime: Infinity,
    initialData: meeting.summary,
  });

  return (
    <section className="p-[2rem] w-full">
      <h2 className="text-center text-[1.5rem] mb-[2rem]">AI 요약</h2>
      {isLoading ? (
        <AiSummarySkeleton />
      ) : isError ? (
        <p className="text-red-500 text-center">요약을 불러오지 못했습니다.</p>
      ) : data ? (
        <div className="flex flex-col gap-[2rem]">
          {SECTIONS.map(({ key, label }) =>
            data[key].length === 0 ? null : (
              <div key={key}>
                <h3 className="font-semibold text-[0.95rem] mb-[0.5rem]">
                  {label}
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {data[key].map((item, i) => (
                    <li key={i} className="text-[0.9rem] text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      ) : null}
    </section>
  );
};

export default AiSummary;
