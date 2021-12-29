import React, { useEffect, useState } from "react";
import "../Components/TasksSection.css";
import { Button, makeStyles, Modal } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Database/Firebase";
import Todo from "../Screens/Todo";
import moment from "moment";
import { useHistory } from "react-router-dom";
function BucketTasks() {
  const [user] = useAuthState(auth);
  const [todayTasks, setTodayTasks] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  const getTodayTasks = () => {
    // const dateOfToday = moment(new Date(Date.now())).format("YYYY-MM-DD");
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .where("inBucket", "==", true)
      .orderBy("porityValue", "desc")
      .onSnapshot((snapshot) => {
        setTodayTasks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };
  useEffect(() => {
    getTodayTasks();
  }, []);
  return (
    <div className={classes.paper}>
      <div className={classes.modalHeader}>
        <h2 style={{ textAlign: "center", fontSize: 30 }}>My Bucket List</h2>
        <p
          style={{ color: "red", fontSize: 20, fontWeight: "bolder" }}
          onClick={() => history.push("./home")}
        >
          BACK TO HOME{" "}
        </p>
      </div>
      <div className="todoItem">
        {todayTasks.map((item) => (
          <Todo todo={item} />
        ))}
      </div>
    </div>
  );
}

export default BucketTasks;

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  paper: {
    // position: "absolute",
    // width:'fit-content',
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
    // boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    maxWidth: 600,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
