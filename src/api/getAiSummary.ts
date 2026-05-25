import { SummaryResult, TMeeting } from "@/types/types";

export async function getAiSummary(meeting: TMeeting): Promise<SummaryResult> {
  const url = `${import.meta.env.VITE_API_URL}/api/meeting-summary`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meeting }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("AI 요약 API 요청 실패:", data.error);
    throw new Error(data.error);
  }

  return data.summary as SummaryResult;
}
