import React, { useState } from "react";
import "../Screens/SignUpPage.css";
import validator from "validator";
import { FormControl, Input, InputLabel, TextField } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { auth, db } from "../Database/Firebase";
import { useHistory } from "react-router-dom";
import photo from "../signup.png";
function SignUpPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();

  const signUp = async (e) => {
    if (password === "" || email === "") {
      setEmailError("Please fill empty field!!");
      setPasswordError("Please fill empty field!!");
    } else {
      if (password.length < 8) {
        setPasswordError("please enter vaild password!!");
      } else if (!validator.isEmail(email)) {
        setEmailError("please enter vaild Email-ID");
      } else {
        // navigate("login");
        e.preventDefault();
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            // console.log(user);
            db.collection("users")
              .doc(auth.currentUser.uid)
              .set({
                Email: email,
                Password: password,
                Id: user.user.uid,
              })
              .then((user) => {
                setPassword("");
                console.log("signup");
                setEmail("");
                setEmailError("");
                setPasswordError("");
                history.push("/home");
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <div className="mainContainerOfLogin">
      <div className="leftContainerOfLogin">
        <h1 style={{ fontWeight: "bolder" }}>
          Welcome,
          <br />
          to <strong style={{ color: "blue" }}>Task Manager</strong> !!
        </h1>{" "}
        <img src={photo} alt="img" />
      </div>
      <div className="rightContainerOfLogin">
        <div className="loginContainerOfLogin">
          <h2>Welcome!!</h2>
          <p>SignUp to Continue</p>
        </div>
        <br />
        <div className="inputContainerOfLogin">
          <FormControl className="inputArea">
            <TextField
              className="textField"
              id="outlined-basic"
              label="Email-ID"
              error={emailError}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              helperText={emailError}
              type="email"
              variant="outlined"
              style={{ marginBottom: "10px" }}
            />
            <br />
          </FormControl>
          <br />
          <FormControl className="inputArea">
            <TextField
              className="textField"
              id="outlined-basic"
              label="Password"
              error={passwordError}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              helperText={passwordError}
              type="password"
              variant="outlined"
              style={{ marginBottom: "10px" }}
            ></TextField>
          </FormControl>
        </div>
        <br />
        <div className="forgotPasswordContainerOfLogin">
          <div className="checkBoxArea">
            <input type="checkbox" name="check" />
            <p>Remember me</p>
          </div>
        </div>
        <br />
        <br />
        <button className="loginBtn" onClick={signUp}>
          SIGNUP
        </button>
        <br />
        <br />
        <br />
        {/* <p className="termCondition">Terms of use.Privacy policy</p> */}
      </div>
    </div>
  );
}
export default SignUpPage;
