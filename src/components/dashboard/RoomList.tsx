import { getAllRooms } from "@/api/room";
import { useQuery } from "@tanstack/react-query";

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
    <ul>
      {data.map((board) => (
        <li key={board.id}>{board.name}</li>
      ))}
    </ul>
  )
}

export default RoomList;