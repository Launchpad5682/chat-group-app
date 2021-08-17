import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../auth/firebase";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  // authentication will take time till then we can use loading to pass only when it is loaded
  const [loading, setLoading] = useState(true);

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

  // useEffect hook to check the currently signed in user
  // https://firebase.google.com/docs/auth/web/manage-users
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      setCurrentUser(null);
    };
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
