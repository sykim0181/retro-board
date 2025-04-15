import { useOthersMapped } from "@liveblocks/react/suspense";
import { useState } from "react";
import UserAvatar from "@/components/common/UserAvatar";
import { Card, CardContent } from "@/components/ui/card";

const PresentUsers = () => {
  const others = useOthersMapped((other) => other.presence.name);
  const [showUserList, setShowUserList] = useState(false);

  if (others.length === 0) {
    return null;
  }

  const [_, firstName] = others[0];

  return (
    <div className="relative">
      <UserAvatar userName={firstName} shadow size={50} />
      <div
        className="absolute right-0 bottom-0"
        onMouseEnter={() => setShowUserList(true)}
        onMouseLeave={() => setShowUserList(false)}
      >
        <div className="relative rounded-[50%] shadow-sm text-[0.8rem] w-[1.5rem] h-[1.5rem] bg-white flex justify-center items-center">
          {`+${others.length}`}
        </div>
        {showUserList && (
          <Card 
            id="other-user-list" 
            className="absolute right-0 z-100 py-[0.5rem] px-[1rem]"
          >
            <CardContent>
              <span className="text-[0.8rem] text-gray-500 text-nowrap">
                {`members (${others.length})`}
              </span>
              <ul>
                {others.map(([_, name], idx) => (
                  <li 
                    key={`other-user-${idx}`} 
                    className="text-nowrap text-[0.8rem]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PresentUsers;
