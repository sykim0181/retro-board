import { Outlet } from "react-router";
import { Card } from "../ui/card";
import AppLogo from "../common/AppLogo";

const DashboardLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="flex items-center px-[1rem] py-[0.5rem] border-b bg-white">
        <AppLogo />
      </header>
      <div className="py-[1rem] px-[1rem] md:px-[2rem] flex flex-col flex-1">
        <Card className="p-[1rem] md:p-[2rem] flex-1">
          <Outlet />
        </Card>
      </div>
    </div>
  );
};

export default DashboardLayout;
