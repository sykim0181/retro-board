import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import DefaultLayout from "./components/layout/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import { getRoomById } from "./api/room";
import RoomLayout from "./components/layout/RoomLayout";
import Reflect from "./pages/Reflect";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Home },
      {
        path: "dashboard",
        Component: DefaultLayout,
        children: [{ index: true, Component: Dashboard }],
      },
      {
        path: "room/:id",
        Component: RoomLayout,
        children: [
          { index: true, element: <Navigate to="reflect" /> },
          { path: "reflect", Component: Reflect }
        ],
        loader: async ({ params }) => {
          const roomId = params.id;
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
