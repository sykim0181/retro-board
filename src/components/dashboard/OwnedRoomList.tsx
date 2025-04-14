import { memo, useMemo, useState } from "react";
import { NavLink } from "react-router";
import { EllipsisVerticalIcon } from "lucide-react";
import useOwnedRoomQuery from "@/hooks/useOwnedRoomQuery";
import { useAppSelector } from "@/store/store";
import CreateRoomDialog from "./CreateRoomDialog";
import { Spinner } from "../ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TRoom } from "@/types/types";
import DeleteRoomAlertDialog from "./DeleteRoomAlertDialog";

const OwnedRoomList = () => {
  const userId = useAppSelector((state) => state.user.user.id);
  const { data, isFetching, error } = useOwnedRoomQuery({ userId });

  const list = useMemo(() => {
    if (error) {
      console.log(error);
      return <p>Oops! Somthing got wrong...</p>;
    }

    if (isFetching || data === undefined) {
      return <Spinner />;
    }

    if (data.length === 0) {
      return <p>There is no room you've created.</p>
    }

    return (
      <ul className="flex flex-col gap-[1rem]">
        {data.map((room) => (
          <ListItem key={room.id} room={room} />
        ))}
      </ul>
    );
  }, [data, isFetching, error]);

  return (
    <>
      <div className="flex flex-row justify-end">
        <CreateRoomDialog />
      </div>
      {list}
    </>
  );
};

interface ListItemProps {
  room: TRoom;
}

const ListItem = memo((props: ListItemProps) => {
  const { room } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <li
      key={room.id}
      className="flex p-[1rem] text-start cursor-pointer hover:bg-gray-100 rounded-xl"
    >
      <NavLink to={`/room/${room.id}`} className="flex-1 block">
        <span>{room.name}</span>
      </NavLink>

      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <EllipsisVerticalIcon height="1rem" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteRoomAlertDialog
        open={isDialogOpen}
        closeDialog={closeDialog}
        room={room}
      />
    </li>
  );
});

export default memo(OwnedRoomList);
