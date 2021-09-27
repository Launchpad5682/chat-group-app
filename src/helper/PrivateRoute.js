import React from "react";
import { useAuth } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser === null ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PrivateRoute;
