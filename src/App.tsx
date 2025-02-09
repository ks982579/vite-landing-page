import React, {
  Dispatch,
  // EffectCallback,
  JSX,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./App.css";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import axios, { AxiosResponse } from "axios";
import postAuthRequest from "./services/authenticate";
import Cookies from "js-cookie";
import { NavigateFunction, useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import LoginForm from "./features/auth/components/LoginForm";

// Used in Services...
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

type LoginRequestFunction = (data: LoginFormData) => void;

export default function App() {
  const [loggedIn, setLoggedIn]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  let navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    // Maybe checked loggedIn at some point.
    // Needs this flexability for keeping state
    if (Cookies.get("accessToken")) {
      navigate("/dashboard");
    }
    return () => { };
  }, [navigate, loggedIn]);

  // Handling request to log in with credentials.
  const logInSubmit: LoginRequestFunction = async (data: LoginFormData) => {
    console.log("Calling Login Submit");
    // TODO: Clean DATA!
    // TODO: Get and check response?
    const res = await postAuthRequest(data);
    console.log(res);
    switch (res.type) {
      case "ok":
        console.log(res.value.status);
        setLoggedIn(true);
        break;
      case "err":
        // Either Raise an Alert or invalid credentials
        console.log(res.error.status);
        // unknown errror please try again later or contact system administrator
        break;
    }
  };

  // TODO: Center the LoginForm
  return (
    <Container>
      <Navbar />
      <h1>Welcome Home</h1>
      <LoginForm onSubmit={logInSubmit} />
    </Container>
  );
}
