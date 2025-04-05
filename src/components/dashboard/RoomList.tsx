import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { getAllRooms } from "@/api/room";

const RoomList = () => {
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ['rooms'],
    queryFn: getAllRooms
  })

  if (isError) {
    console.log(error);
    return (
      <p>Error!</p>
    )
  }

  if (isFetching || data === undefined) {
    return (
      <p>fetching data...</p>
    )
  }

  return (
    <ul className="flex flex-col gap-[2rem]">
      {data.map((room) => (
        <li 
          key={room.id}
          className="text-start cursor-pointer hover:bg-gray-100 rounded-xl"
        >
            <NavLink 
              to={`/room/${room.id}`}
              className="block p-[1rem]"
            >
              {room.name}
            </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default RoomList;