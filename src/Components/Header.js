import { Button, makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { auth, db } from "../Database/Firebase";

function Header() {
  const [user] = useAuthState(auth);
  const userName = auth.currentUser.email.split("@")[0];
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const history = useHistory();
  return (
    <div>
      <div className="userDetails">
        <h3>
          <strong style={{ color: "blue" }}>Hey {userName},</strong> Welcome to Task Manager
        </h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/bucket")}
        >
          Bucket
        </Button>
      </div>
      <div className="verticalLine" />
    </div>
  );
}

export default Header;

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
