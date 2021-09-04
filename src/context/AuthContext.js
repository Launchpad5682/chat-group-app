import { createContext, useContext, useState, useEffect } from "react";
import { auth, fireDB, app } from "../auth/firebase";

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

    // adding messages array
    //console.log(groupDoc);
  }

  async function getUsers() {}

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
    let groupDataCol = await fireDB
      .collection("groups")
      .doc(await getGroupID(group))
      .collection("group_data")
      //.doc("users")
      // .where("users", "==", true)
      .get()
      // .then((snapshot) => {
      //   if (snapshot.empty) {
      //     console.log("No match found");
      //   } else {
      //     snapshot.forEach((doc) => {
      //       console.log(doc);
      //     });
      //   }
      // });
      .then((snapshot) => snapshot.forEach((doc) => console.log(doc.data())));

    console.table(groupDataCol);
  }

  // messaging

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
    addUser2Group,
    addGroup,
    getGroups,
    getGroupID,
    groups,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
