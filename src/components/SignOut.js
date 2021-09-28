import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignOut() {
  const { signout } = useAuth();

  useEffect(() => {
    signout();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="pt-10">
      Sign Out Successful
      <NavLink to="/login" className="p-4 rounded-lg bg-red-700 text-white">Login</NavLink>
    </div>
  );
}

export default SignOut;
