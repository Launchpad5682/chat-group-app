import { createContext, useContext, useState, useEffect } from "react";
import { auth, fireDB, firebase } from "../auth/firebase";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";

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
  const [user, setUser] = useState();
  const width = window.innerWidth;

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

  async function addGroup(groupName, groupDesc) {
    // creating document with custom ID
    await fireDB.collection("groups").doc(groupName).set({
      group: groupName,
      description: groupDesc,
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

  function getAvatar(userName) {
    const avatar = createAvatar(style, {
      seed: userName,
      dataUri: true,
      size: 48,
    });
    return avatar;
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
            arrUsers.push({
              name: ele.name,
              svg: ele.svg,
            });
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

  async function addUser2Group(group) {
    //const { uid, photoURL } = currentUser;

    let groupUsersRef = await fireDB
      .collection("groups")
      // .doc(await getGroupID(group))
      .doc(group)
      .collection("group_data")
      .doc("users");

    groupUsersRef.update({
      users: firebase.firestore.FieldValue.arrayUnion({
        uid: currentUser.uid,
        name: currentUser.email.split("@")[0],
        svg: getAvatar(currentUser.email.split("@")[0]),
      }),
    });
  }

  // messaging
  async function sendMessage(groupName, msg) {
    await fireDB
      .collection("groups")
      .doc(groupName)
      .collection("messages")
      .add({
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
      window.sessionStorage.setItem("currentUser", currentUser);
      setLoading(false);
      // temporary
      // if (currentUser) addUser2Group(group);
    });

    return () => unsubscribe();
  });

  useEffect(() => {
    setCurrentUser(JSON.parse(window.sessionStorage.getItem("currentUser")));
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
    group,
    groups,
    sendMessage,
    user,
    setUser,
    width,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
