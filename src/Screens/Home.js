import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "./Home.css";
import {
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Modal,
} from "@material-ui/core";
import Todo from "./Todo";
import firebase from "firebase/compat/app";
import { auth, db } from "../Database/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TaskModal from "../Components/TaskModal";
import Header from "../Components/Header";
import TasksSection from "../Components/TasksSection";
function Home() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setinput] = useState("");
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .orderBy("porityValue", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    console.log(user.uid);
  }, []);
  console.log(todos);

  return (
    <div className="home">
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
        <TaskModal close={handleClose} authId={user.uid} />
      </Modal>
      <Header />
      <TasksSection />
      <div className="home_section">
        <div className="leftHomeSection">
          <div className="top">
            <h2 style={{ fontWeight: 500 }}>ALL TASKS</h2>
            <Button onClick={handleOpen} variant="contained" color="primary">
              add new task
            </Button>
          </div>
          <div className="todoItem">
            {todos.map((data) => (
              <Todo todo={data} />
            ))}
          </div>
        </div>
        {/* <div className="rightHomeSection"><TasksSection /></div> */}
      </div>
    </div>
  );
}

export default Home;

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
