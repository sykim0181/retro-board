import { Outlet } from "react-router";
import { Card } from "../ui/card";

const DashboardLayout = () => {
  return (
    <div className="py-[1rem] px-[1rem] md:px-[2rem] min-h-dvh flex flex-col">
      <Card className="p-[1rem] md:p-[2rem] flex-1">
        <Outlet />
      </Card>
    </div>
  );
};

export default DashboardLayout;
