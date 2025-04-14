import Avvvatars from "avvvatars-react";
import { memo } from "react";

interface UserAvatarProps {
  userName: string;
}

const UserAvatar = (props: UserAvatarProps) => {
  const { userName } = props;

  return <Avvvatars value={userName} />;
};

export default memo(UserAvatar);
