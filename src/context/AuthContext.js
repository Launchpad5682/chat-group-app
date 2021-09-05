import { createContext, useContext, useState, useEffect } from "react";
import { auth, fireDB, firebase } from "../auth/firebase";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  // authentication will take time till then we can use loading to pass only when it is loaded
  const [loading, setLoading] = useState(true);

  // user and group data for chats
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(null);
  const [users, setUsers] = useState([]);

  //signup function
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  //login function
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  //sign out function
  function signout() {
    setCurrentUser(null);
    return auth.signOut();
  }

  async function getGroups() {
    let tempGroups = [];
    await fireDB
      .collection("groups")
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => tempGroups.push(doc.data().group))
      );

    setGroups(tempGroups);
  }

  async function addGroup(groupName) {
    // creating document with custom ID
    await fireDB.collection("groups").doc(groupName).set({
      group: groupName,
    });

    // adding users array list to the group data collection
    await fireDB
      .collection("groups")
      .doc(groupName)
      .collection("group_data")
      .doc("users")
      .set({
        users: [],
      });

    // adding messages sub collection
    // await fireDB.collection("groups").doc(groupName).collection("messages");
  }

  async function getUsers(groupName) {
    await fireDB
      .collection("groups")
      .doc(groupName)
      .collection("group_data")
      .doc("users")
      .get()
      .then((doc) => {
        const arr = Object.values(doc.data().users);
        let arrUsers = [];
        arr.forEach((ele) => {
          if (typeof ele === "object") {
            arrUsers.push(ele.name);
          } else {
            arrUsers.push(ele);
          }
        });

        setUsers(arrUsers);
      });

    // console.log(userDoc.data(), "printing user document");
    // let userList = userDoc.data();
    // console.log(userDoc.users[0], "printing user data");
    // setUsers(userDoc.data());
  }

  async function getGroupID(group) {
    let id = null;
    try {
      await fireDB
        .collection("groups")
        .where("group", "==", group)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            id = doc.id;
          });
        });
      return id;
    } catch (error) {
      return null;
    }
  }

  async function addUser2Group(group, user) {
    const { uid, photoURL } = currentUser;

    let groupUsersRef = await fireDB
      .collection("groups")
      // .doc(await getGroupID(group))
      .doc(group)
      .collection("group_data")
      .doc("users");

    groupUsersRef.update({
      users: firebase.firestore.FieldValue.arrayUnion({
        name: currentUser.email,
        uid: currentUser.uid,
      }),
    });
  }

  // messaging
  async function sendMessage(groupName, msg) {
    await fireDB.collection("groups").doc(groupName).collection("messages").add({
      uid: currentUser.uid,
      name: currentUser.email,
      body: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  // useEffect hook to check the currently signed in user
  // https://firebase.google.com/docs/auth/web/manage-users
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    signout,
    users,
    addUser2Group,
    addGroup,
    getGroups,
    setGroup,
    getGroupID,
    getUsers,
    groups,
    sendMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

/*
// Update the timestamp field with the value from the server
db.collection('objects').doc('some-id').update({
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
});
 */
