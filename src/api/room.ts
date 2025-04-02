import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export async function createRoom(roomName: string) {
  const roomId = uuidv4();
  const boardRef = doc(db, "board", roomId);
  const newRoom = {
    id: roomId,
    name: roomName,
  };
  await setDoc(boardRef, newRoom);
}

export async function getAllRooms() {
  const boardRef = collection(db, "board");
  const querySnapShot = await getDocs(boardRef);
  return querySnapShot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      name: data.name,
    };
  });
}
