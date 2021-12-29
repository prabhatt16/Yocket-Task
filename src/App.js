import "./App.css";
import LoginPage from "./Screens/LoginPage";
import SignUpPage from "./Screens/SignUpPage";
import Home from "./Screens/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./Database/Firebase";
import TodayTask from "./Components/TodayTask";
import CompleteTask from "./Components/CompleteTask";
import PendingTask from "./Components/PendingTask";
import BucketTasks from "./Components/BucketTasks";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth.uid,
        email: userAuth.email,
      };
      if (userAuth) {
        // console.log("userAuth", userAuth);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Switch>
            <Route path="/register">
              <SignUpPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/todaytask">
              <TodayTask />
            </Route>
            <Route path="/completedtasks">
              <CompleteTask />
            </Route>
            <Route path="/pendingtasks">
              <PendingTask />
            </Route>
            <Route path="/bucket">
              <BucketTasks />
            </Route>
            <Route path="/register">
              <SignUpPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        )}
      </Router>
      {/* <SignUpPage /> */}
    </div>

    // <Home />
  );
}

export default App;
