import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";

const DefaultLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default DefaultLayout;
