import React, { useEffect, useState } from "react";
import "../Components/TasksSection.css";
import { Button, makeStyles, Modal } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Database/Firebase";
import Todo from "../Screens/Todo";
import moment from "moment";
import { useHistory } from "react-router-dom";
function CompleteTask() {
  const [user] = useAuthState(auth);
  const [completedTasks, setCompletedTasks] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  const getCompletedTasks = () => {
    // const dateOfCompleted = moment(new Date(Date.now())).format("YYYY-MM-DD");
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .where("status", "==", "Completed")
      .orderBy("porityValue", "desc")
      .onSnapshot((snapshot) => {
        setCompletedTasks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };
  useEffect(() => {
    getCompletedTasks();
  }, []);
  return (
    <div className={classes.paper}>
      <div className={classes.modalHeader}>
        <h2 style={{ textAlign: "center", fontSize: 30 }}>
          Completed Task List
        </h2>
        <p
          style={{ color: "red", fontSize: 20, fontWeight: "bolder" }}
          onClick={() => history.push("./home")}
        >
          BACK TO HOME{" "}
        </p>
      </div>
      <div className="todoItem">
        {completedTasks.map((item) => (
          <Todo todo={item} />
        ))}
      </div>
    </div>
  );
}

export default CompleteTask;

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
