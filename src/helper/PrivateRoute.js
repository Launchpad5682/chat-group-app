import React from "react";
import { useAuth } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const currentUser = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
