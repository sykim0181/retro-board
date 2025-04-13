import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import { getRoomById } from "./api/room";
import RoomLayout from "./components/layout/RoomLayout";
import Reflect from "./pages/room/Reflect";
import Discuss from "./pages/room/Discuss";
import DefaultLayout from "./components/layout/DefaultLayout";
import Vote from "./pages/room/Vote";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "dashboard",
        Component: DashboardLayout,
        children: [{ index: true, Component: Dashboard }],
      },
      {
        path: "room/:roomId",
        Component: RoomLayout,
        children: [
          { index: true, element: <Navigate to="reflect" replace /> },
          { path: "reflect", Component: Reflect },
          { path: "vote", Component: Vote },
          { path: "discuss", element: <Navigate to="1" replace /> },
          { path: "discuss/:taskIdx", Component: Discuss },
        ],
        loader: async ({ params }) => {
          const roomId = params.roomId;
          if (!roomId) {
            throw new Error("Invalid room id");
          }
          const room = await getRoomById(roomId);
          return room;
        },
      },
    ],
  },
]);

export default router;
