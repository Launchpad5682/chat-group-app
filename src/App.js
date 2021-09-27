import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import SignUp from "./components/SignUp";
import PrivateRoute from "./helper/PrivateRoute";
import "./styles/output.css";
import { useAuth } from "./context/AuthContext";
import Main from "./components/Main";
import { ModalOverlayProvider } from "./context/ModalOverlayContext";
import Messages from "./components/Messages";

function App() {
  const { groups, getGroups, currentUser } = useAuth();

  useEffect(() => {
    getGroups();
    // eslint-disable-next-line
  }, []);

  return (
    <ModalOverlayProvider>
      <Router>
        <Switch>
          {groups
            ? groups.map((group) => (
                <PrivateRoute exact path={"/" + group} component={Messages} />
              ))
            : null}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signout" component={SignOut} />
          <PrivateRoute exact path="/groups" component={Main} />
          {/* <PrivateRoute exact path="/:id" component={Messages} /> */}
          <Route
            path="/"
            render={() =>
              currentUser === null ? (
                <Redirect to="/login" />
              ) : (
                <Redirect to="/groups" />
              )
            }
          />
        </Switch>
      </Router>
    </ModalOverlayProvider>
  );
}

export default App;
