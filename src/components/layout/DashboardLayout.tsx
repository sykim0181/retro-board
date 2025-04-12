import { Outlet } from "react-router";
import { Card } from "../ui/card";

const DashboardLayout = () => {
  return (
    <div className="py-[1rem] px-[2rem] min-h-dvh flex flex-col">
      <Card className="p-[2rem] flex-1">
        <Outlet />
      </Card>
    </div>
  );
};

export default DashboardLayout;
