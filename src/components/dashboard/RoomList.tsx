import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { getAllRooms } from "@/api/room";
import { Spinner } from "../ui/spinner";

const RoomList = () => {
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRooms,
    staleTime: 60 * 1000,
  });

  if (isError) {
    console.log(error);
    return <p>Error occured while fetching the list of room..!</p>;
  }

  if (isFetching || data === undefined) {
    return <Spinner />;
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
};

export default RoomList;
