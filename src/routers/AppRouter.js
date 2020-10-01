import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from "../components/actions/auth";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../components/actions/notes";

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user));
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
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/"
            component={JournalScreen}
          />

          <PublicRoute
            isLoggedIn={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />
        </Switch>
      </div>
    </Router>
  );
};
