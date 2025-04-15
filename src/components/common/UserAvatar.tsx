import Avvvatars from "avvvatars-react";
import { memo } from "react";

interface UserAvatarProps {
  userName: string;
  shadow?: boolean;
  size?: number;
}

const UserAvatar = (props: UserAvatarProps) => {
  const { userName, shadow, size } = props;

  return <Avvvatars value={userName} shadow={shadow} size={size} />;
};

export default memo(UserAvatar);
