import React, { useEffect, useState } from "react";
import "../Screens/LoginPage.css";
import validator from "validator";
import { FormControl, Input, InputLabel, TextField } from "@material-ui/core";
import { auth } from "../Database/Firebase";
import photo from "../signin.png";
import { useHistory } from "react-router-dom";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();

  const loginButton = async (e) => {
    if (password === "" || email === "") {
      setEmailError("Please fill empty field!!");
      setPasswordError("Please fill empty field!!");
    } else {
      if (password.length < 8) {
        setPasswordError("please enter vaild password!!");
      } else if (!validator.isEmail(email)) {
        setEmailError("please enter vaild Email-ID");
      } else {
        e.preventDefault();
        await auth
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            alert("Logged-in!!");
            console.log(user.user.uid);
            history.push("/home");
            setPassword("");
            setEmail("");
            setEmailError("");
            setPasswordError("");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const goToSignUp = () => {
    history.push("/register");
  };
  return (
    <div className="mainContainerOfLogin">
      <div className="leftContainerOfLogin">
        <h1 style={{ fontWeight: "bolder" }}>
          Hey,
          <br />
          Assign a <strong style={{ color: "blue" }}>Task</strong> !!
        </h1>
        <img src={photo} alt="img" />
      </div>
      <div className="rightContainerOfLogin">
        <div className="loginContainerOfLogin">
          <h2>Welcome back!</h2>
          <p>please login to your account.</p>
        </div>
        <br />
        <div className="inputContainerOfLogin">
          <FormControl className="inputArea">
            {/* <InputLabel htmlFor="my-input">email</InputLabel>
            <Input
              id="my-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby="my-helper-text"
            /> */}
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
        <button className="loginBtn" onClick={loginButton}>
          Login
        </button>
        <br />
        <br />
        <br />
        <p className="termCondition">
          Don't have account? <strong onClick={goToSignUp}>SignUp</strong>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;
