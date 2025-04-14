import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "@/lib/firebase";
import { TRoom } from "@/types/types";

/* room 생성 */
export async function createRoom(roomName: string, ownerId: string) {
  const roomId = nanoid();
  const roomRef = doc(db, "room", roomId);
  const newRoom = {
    id: roomId,
    name: roomName,
    ownerId,
  };
  await setDoc(roomRef, newRoom);
}

/* room 삭제 */
export async function deleteRoom(roomId: string) {
  const roomRef = doc(db, "room", roomId);
  await deleteDoc(roomRef);
}

/* 모든 room fetch */
export async function getAllRooms(): Promise<TRoom[]> {
  const roomRef = collection(db, "room");
  const querySnapShot = await getDocs(roomRef);
  return querySnapShot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      name: data.name,
      ownerId: data.ownerId,
    };
  });
}

/* 특정 id에 해당하는 room fetch */
export async function getRoomById(roomId: string): Promise<TRoom> {
  const docRef = doc(db, "room", roomId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("No such room.");
  }
  return docSnap.data() as TRoom;
}

/* 사용자가 생성한 모든 room fetch */
export async function getRoomsByOwnerId(ownerId: string): Promise<TRoom[]> {
  const roomRef = collection(db, "room");
  const q = query(roomRef, where("ownerId", "==", ownerId));
  const querySnapshot = await getDocs(q);
  const rooms: TRoom[] = [];
  querySnapshot.forEach((doc) => {
    rooms.push(doc.data() as TRoom);
  });
  return rooms;
}

/* 특정 room을 저장 */
export async function addRoom(roomId: string): Promise<void> {
  const docRef = doc(db, "room", roomId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Room Not Found.");
  }

  const key = "retro-user-rooms";
  const prevRooms = localStorage.getItem(key);
  const newRoomIds: string[] = prevRooms ? JSON.parse(prevRooms) : [];
  newRoomIds.push(roomId);
  localStorage.setItem(key, JSON.stringify(newRoomIds));
}

/* 사용자가 추가한 모든 room fetch */
export async function getAddedRooms(): Promise<TRoom[]> {
  const addedRoomIds = localStorage.getItem("retro-user-rooms");
  if (!addedRoomIds) {
    return [];
  }

  const ids = JSON.parse(addedRoomIds) as string[];
  const roomRef = collection(db, "room");
  const q = query(roomRef, where("id", "in", ids));
  const querySnapshot = await getDocs(q);
  const rooms: TRoom[] = [];
  querySnapshot.forEach((doc) => {
    rooms.push(doc.data() as TRoom);
  });
  return rooms;
}
