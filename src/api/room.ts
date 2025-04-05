import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { nanoid } from "nanoid";
import { TRoom } from "@/types/types";

export async function createRoom(roomName: string) {
  const roomId = nanoid();
  const roomRef = doc(db, "room", roomId);
  const newRoom = {
    id: roomId,
    name: roomName,
  };
  await setDoc(roomRef, newRoom);
}

export async function getAllRooms(): Promise<TRoom[]> {
  const roomRef = collection(db, "room");
  const querySnapShot = await getDocs(roomRef);
  return querySnapShot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      name: data.name,
    };
  });
}

export async function getRoomById(roomId: string): Promise<TRoom> {
  const docRef = doc(db, "room", roomId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("No such room.");
  }
  return docSnap.data() as TRoom;
}
