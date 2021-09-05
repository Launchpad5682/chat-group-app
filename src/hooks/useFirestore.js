import { useEffect, useState } from "react";
import { fireDB } from "../auth/firebase";

export const useFireStore = (groupName) => {
  // storing messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribe = fireDB
      .collection("groups")
      .doc(groupName)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        let documents = [];
        
        snapshot.forEach((doc) => {
          doc = doc.data();
          documents.push({
            uid: doc.uid,
            name: doc.name,
            body: doc.body,
            createdAt: doc.createdAt,
          });
        });

        setMessages(documents);
      });

    return () => unsubscribe();
  }, [groupName]);

  return { messages };
};
