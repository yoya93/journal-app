import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from "../components/actions/auth";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <LinearProgress />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={JournalScreen} />

          <Route path="/auth" component={AuthRouter} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
