import { Outlet, useLoaderData, useParams } from "react-router";
import { Card } from "../ui/card";
import { TMeeting } from "@/types/types";
import AppHeader from "../common/AppHeader";

const SummaryLayout = () => {
  const params = useParams();
  const roomId = params.roomId;

  if (!roomId) {
    throw new Error("Invalid room id");
  }

  const meeting = useLoaderData() as TMeeting;

  return (
    <div className="min-h-dvh flex flex-col">
      <AppHeader />
      <Card className="p-[1rem] m-[1rem]">
        <Outlet context={{ meeting }} />
      </Card>
    </div>
  );
};

export default SummaryLayout;
