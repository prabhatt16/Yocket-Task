import {
  colors,
  List,
  ListItem,
  ListItemText,
  Modal,
  Slider,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../Screens/Todo.css";
import { db } from "../Database/Firebase";
import EditTaskModal from "../Components/EditTaskModal";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [line, setLine] = useState("normal");
  const userId = props.todo.data.userID;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTask = async () => {
    await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(props.todo.id)
      .delete();
  };
  const addToBucket = async () => {
    await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(props.todo.id)
      .update({
        inBucket: true,
      })
      .then(() => {
        alert("Now Task added to the buckect!!");
        console.log(props.todo.data.inBucket);
      });
  };

  const taskDone = () => {
    db.collection("users")
      .doc(props.todo.data.userID)
      .collection("tasks")
      .doc(props.todo.id)
      .update({
        status: "Completed",
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EditTaskModal props={props.todo.id} close={handleClose} />
      </Modal>

      <div
        className="cardContainer"
        style={{
          opacity: `${props.todo.data.status}` == "Incomplete" ? 1 : 0.6,
        }}
      >
        <CardContent>
          <List className="todo_list">
            <div className="leftListItem">
              <p
                style={{
                  color:
                    `${props.todo.data.status}` === "Incomplete"
                      ? "orange"
                      : "green",
                }}
              >
                {props.todo.data.status}
              </p>
              <h3>{props.todo.data.task}</h3>
            </div>

            <div className="dueDateSection">
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ margin: "0" }}>Priority</p>
                  <h4 style={{ margin: "0" }}>
                    {props.todo.data.porityValue}%
                  </h4>
                </div>
                <div
                  style={{
                    display: "block",
                    justifyContent: "end",
                    alignItems: "center",
                    marginLeft: 40,
                  }}
                >
                  <p style={{ margin: 0 }}>Deadline</p>
                  <h4
                    className="listText"
                    style={{ textDecoration: line, margin: 0 }}
                  >
                    {props.todo.data.dueToDate}
                  </h4>
                </div>
              </div>
            </div>
          </List>
        </CardContent>
        <CardActions className="cardBtn">
          <MdDelete
            onClick={deleteTask}
            style={{ color: "red", height: 25, width: 25 }}
          ></MdDelete>
          <IoMdCheckmark
            onClick={taskDone}
            style={{ color: "green", height: 25, width: 25 }}
          ></IoMdCheckmark>
          <IoMdAdd
            onClick={addToBucket}
            style={{ color: "blue", height: 25, width: 25 }}
          ></IoMdAdd>
          <MdEdit
            onClick={() =>
              `${props.todo.data.status}` === "Incomplete"
                ? handleOpen(true)
                : ""
            }
            style={{ color: "grey", height: 25, width: 25 }}
          ></MdEdit>
        </CardActions>
      </div>
    </div>
  );
}

export default Todo;
