import { TMeeting } from "@/types/types";

export async function getAiSummary(meeting: TMeeting): Promise<string> {
  const url = `${import.meta.env.VITE_API_URL}/api/meeting-summary`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meeting }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.summary;
}
