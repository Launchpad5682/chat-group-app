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
  const { groups, getGroups } = useAuth();

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
                <PrivateRoute path={"/" + group}>
                  <Messages />
                </PrivateRoute>
              ))
            : null}
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={SignIn} />
          <Route path="/signout" component={SignOut} />
          <PrivateRoute path="/groups">
            <Main />
          </PrivateRoute>
          <PrivateRoute path="/:id">
            <Messages />
          </PrivateRoute>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </ModalOverlayProvider>
  );
}

export default App;
