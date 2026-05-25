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

const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
    <div className="flex-1 h-px bg-border" />
    <span>{label}</span>
    <div className="flex-1 h-px bg-border" />
  </div>
);

const OwnedRoomList = () => {
  const userId = useAppSelector((state) => state.user.user.id);
  const { data, isFetching, error } = useOwnedRoomQuery({ userId });

  const list = useMemo(() => {
    if (error) {
      console.log(error);
      return <p>Oops! Something got wrong...</p>;
    }

    if (isFetching || data === undefined) {
      return <Spinner />;
    }

    if (data.length === 0) {
      return <p>There is no room you've created.</p>
    }

    const activeRooms = data.filter((r) => !r.isFinished);
    const finishedRooms = data.filter((r) => r.isFinished);

    return (
      <div className="flex flex-col gap-[0.5rem]">
        {activeRooms.length > 0 && (
          <ul className="flex flex-col gap-[0.5rem]">
            {activeRooms.map((room) => (
              <ListItem key={room.id} room={room} />
            ))}
          </ul>
        )}
        {finishedRooms.length > 0 && (
          <>
            <SectionDivider label="Finished" />
            <ul className="flex flex-col gap-[0.5rem]">
              {finishedRooms.map((room) => (
                <ListItem key={room.id} room={room} />
              ))}
            </ul>
          </>
        )}
      </div>
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

  const to = room.isFinished ? `/summary/${room.id}` : `/room/${room.id}`;

  return (
    <li className="flex p-[1rem] text-start cursor-pointer hover:bg-gray-100 rounded-xl">
      <NavLink to={to} className="flex-1 block">
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
