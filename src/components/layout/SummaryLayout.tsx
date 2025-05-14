import { Outlet, useLoaderData, useParams } from "react-router";
import { Card } from "../ui/card";
import { TMeeting } from "@/types/types";

const SummaryLayout = () => {
  const params = useParams();
  const roomId = params.roomId;

  if (!roomId) {
    throw new Error("Invalid room id");
  }

  const meeting = useLoaderData() as TMeeting;

  return (
    <Card className="p-[1rem] m-[1rem]">
      <Outlet context={{ meeting }} />
    </Card>
  );
};

export default SummaryLayout;
