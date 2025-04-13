import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";

const DefaultLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
      <div
        id="portal"
        className="absolute top-0 left-0"
      />
    </>
  );
};

export default DefaultLayout;
