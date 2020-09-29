import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { useDispatch } from "react-redux";
import { login } from "../components/actions/auth";

import { firebase } from "../firebase/firebase-config";

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
      }
    });
  }, [dispatch]);

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
