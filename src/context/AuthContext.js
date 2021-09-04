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
    
  }

  async function getUsers() {}

  async function addUser2Group(user) {
    const { uid, photoURL } = currentUser;
    // fireDB
    //   .collection("groups")
    //   .doc("welcome")
    //   .collection("group_data")
    //   .doc("users")
    //   .then((data) => console.log(data));
    // // console.log(uid, photoURL);
    // // return { uid, photoURL };
    // await fireDB
    //   .collectionGroup("groups")
    //   .where("group", "==", "welcome")
    //   .collection("group_data")
    //   .get()
    //   // .doc("welcome")
    //   // .collection("group_data")
    //   // .get()
    //   .then((snapshot) => snapshot.forEach((doc) => console.log(doc.data())));

    // await fireDB
    //   .collection("groups")
    //   .get()
    //   .then((snapshot) =>
    //     snapshot.forEach((data) => console.log(data.data()))
    //   );

    await fireDB
      .collection("groups/welcome/group_data")
      .get()
      .then((snapshot) => snapshot.forEach((doc) => console.log(doc.data())));

    // const arrayUnion = fireDB.FieldValue;
    // console.dir(arrayUnion);

    const doc = await fireDB.doc("groups/welcome/group_data/users");

    doc.update({
      items: fireDB.FieldValue.arrayUnion("Atharva"),
    });

    // await doc.update({
    //   items: arrayUnion(user),
    // });

    // await fireDB
    //   .collection("groups")
    //   // .where("group", "==", "welcome")
    //   .doc("welcome")
    //   .collection("group_data")
    //   .doc("users")
    //   .get()
    //   .then((snapshot) => console.table(snapshot));
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
    addUser2Group,
    getGroups,
    groups,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
