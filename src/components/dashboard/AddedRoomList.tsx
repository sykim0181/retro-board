import { memo, useCallback, useMemo, useRef } from "react";
import { NavLink } from "react-router";
import useAddedRoomQuery from "@/hooks/useAddedRoomQuery";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useAddRoomMutation from "@/hooks/useAddRoomMutation";
import { Spinner } from "../ui/spinner";

const AddedRoomList = () => {
  const { data, isFetching, error } = useAddedRoomQuery();
  const { mutate } = useAddRoomMutation();

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickAddButton = useCallback(() => {
    const value = inputRef.current?.value;
    if (value === undefined || value === "") {
      return;
    }

    // 방 추가
    mutate({ roomId: value });
  }, [mutate, inputRef]);

  const list = useMemo(() => {
    if (error) {
      console.log(error);
      return <p>Oops! Somthing got wrong...</p>;
    }

    if (isFetching || data === undefined) {
      return <Spinner />;
    }

    if (data.length === 0) {
      return <p>There is no room you've added.</p>;
    }

    return (
      <ul className="flex flex-col gap-[1rem]">
        {data.map((room) => (
          <li
            key={room.id}
            className="text-start cursor-pointer hover:bg-gray-100 rounded-xl"
          >
            <NavLink to={`/room/${room.id}`} className="block p-[1rem]">
              <span>{room.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }, [data, isFetching, error]);

  return (
    <>
      <div className="flex justify-end gap-[0.5rem]">
        <Label className="sr-only">Room ID</Label>
        <Input
          ref={inputRef}
          placeholder="Room ID to add"
          className="max-w-xs"
        />
        <Button onClick={onClickAddButton}>Add</Button>
      </div>
      {list}
    </>
  );
};

export default memo(AddedRoomList);
