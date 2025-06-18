import { useUpdateMyPresence } from "@liveblocks/react";
import { useEffect } from "react";
import { useAppSelector } from "@/store/store";

const User = () => {
  const userName = useAppSelector((state) => state.user.user.name);
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    updateMyPresence({
      name: userName,
    });
  }, [userName, updateMyPresence]);

  return null;
};

export default User;
