import React, { useEffect, useState } from "react";
import "../Components/TasksSection.css";
import { Button, makeStyles, Modal } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Database/Firebase";
import Todo from "../Screens/Todo";
import moment from "moment";
import { useHistory } from "react-router-dom";
function TasksSection() {
  const [user] = useAuthState(auth);
  const history = useHistory();

  return (
    <div className="tasksSection">
      <div className="taskBtnSection">
        <div className="tasksBtn" onClick={() => history.push("/todaytask")}>
          <h2>Today's Tasks</h2>
        </div>
        <div
          className="tasksBtn"
          onClick={() => history.push("/completedtasks")}
        >
          <h2>Complete Tasks</h2>
        </div>
        <div className="tasksBtn" onClick={() => history.push("/pendingtasks")}>
          <h2>Pending Tasks</h2>
        </div>
      </div>
    </div>
  );
}

export default TasksSection;

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: "white",
    border: "1px solid #000",
    borderRadius: 10,
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    maxWidth: 600,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
