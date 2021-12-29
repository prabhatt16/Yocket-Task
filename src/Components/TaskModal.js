import {
  Button,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Slider,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Database/Firebase";
import firebase from "firebase/compat/app";
import "../Components/TaskModal.css";

function TaskModal({ authId, close }) {
  const [todos, setTodos] = useState([]);
  const [input, setinput] = useState("");
  const [dueDate, setDueDate] = useState(Date.now());
  const [value, setValue] = useState(30);
  // const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  console.log(authId);
  const marks = [
    {
      value: 0,
      label: "Low",
    },

    {
      value: 50,
      label: "Mid",
    },

    {
      value: 100,
      label: "High",
    },
  ];
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }
  const addTodo = (event) => {
    event.preventDefault();

    if (authId) {
      const deadline = new Date(dueDate).toLocaleString().split(",")[0];
      db.collection("users")
        .doc(authId)
        .collection("tasks")
        .doc()
        .set({
          task: input,
          userID: authId,
          currentDate: new Date(Date.now()).toLocaleDateString(),
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          dueToDate: deadline,
          porityValue: value,
          status: "Incomplete",
          inBucket: false,
        });
      setinput("");
      setDueDate(Date.now());
      setValue(30);
      close();
    }
  };

  return (
    <div className={classes.paper}>
      <div className={classes.modalHeader}>
        <h2 style={{ textAlign: "center" }}>Add your new task!!</h2>
        <p style={{ color: "red", fontWeight: "bolder" }} onClick={close}>
          close
        </p>
      </div>
      <div className="taskSection">
        <FormControl className="inputArea1">
          <InputLabel htmlFor="my-input">Enter your task</InputLabel>
          <Input
            id="my-input"
            type="input"
            value={input}
            onChange={(event) => setinput(event.target.value)}
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <br />
        <br />
        <div className={classes.root}>
          <Typography id="discrete-slider-custom" gutterBottom>
            Deadline
          </Typography>
          <input
            onChange={(e) => setDueDate(e.target.value)}
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
            type="date"
            value={dueDate}
            placeholder="Give Due Date"
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <br />
        <div className={classes.root}>
          <Typography id="discrete-slider-custom" gutterBottom>
            Set Priority
          </Typography>
          <Slider
            // defaultValue={20}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            value={value}
            onChange={handleSliderChange}
          />
        </div>
        <br />
        <Button
          className={classes.submitBtn}
          style={{ margin: "0 auto", paddingTop: 8 }}
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          add todo
        </Button>
      </div>
    </div>
  );
}

export default TaskModal;

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
