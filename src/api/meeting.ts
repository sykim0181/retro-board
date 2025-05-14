import { db } from "@/lib/firebase";
import { MeetingDB, RoomDB, TopicDB } from "@/types/dbTypes";
import { TMeeting, TReaction, TTask, TTopic } from "@/types/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function saveMeeting(
  roomId: string,
  topics: TTopic[],
  tasks: TTask[]
) {
  const newTopics: TopicDB[] = topics.map((topic) => {
    const reactionMap = topic.reactions;
    const newReactions: TReaction[] = Array.from(reactionMap.values());

    return {
      card: topic.card,
      reactions: newReactions,
      chats: topic.chats,
    };
  });

  const roomRef = doc(db, "room", roomId);
  const data: MeetingDB = {
    topics: newTopics,
    tasks,
  };
  try {
    await updateDoc(roomRef, data);
  } catch (err) {
    console.log(err);
  }
}

/* 특정 room의 회의 데이터 fetch */
export async function getRoomMeeting(roomId: string): Promise<TMeeting> {
  const docRef = doc(db, "room", roomId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("No such room.");
  }

  const data = docSnap.data() as RoomDB;

  if (data.tasks === undefined || data.topics === undefined) {
    throw new Error("No meeting data saved ");
  }

  return {
    id: data.id,
    name: data.name,
    ownerId: data.ownerId,
    topics: data.topics,
    tasks: data.tasks,
  };
}
