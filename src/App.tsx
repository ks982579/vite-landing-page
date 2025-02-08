// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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

// TODO: Add to types area
type JSXNode = JSX.Element | null;

// Used in Services...
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

type LoginRequestFunction = (data: LoginFormData) => void;

function LoginForm({ onSubmit }: LoginFormProps): JSXNode {
  // Overly explicit
  const [formData, setFormData]: [
    LoginFormData,
    Dispatch<SetStateAction<LoginFormData>>,
  ] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev: LoginFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  // Container centers content horizontally = MOST BASIC LAYOUT ELEMENT
  // Paper displayes elements on *elevated* surface
  // Box is generic Theme-aware container
  return (
    <Container maxWidth="sm">
      <Paper elevation={2} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h3" component="h3" sx={{ border: 1 }}>
          Login
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              // error
              // helperText="Incorrect Entry"
              margin="normal"
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                Log In
              </Button>
            </Box>
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
}

// hoisted
function App() {
  // const [count, setCount] = useState(0);
  let navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      navigate("/dashboard");
    }
    return () => { };
  }, []);

  const logInSubmit: LoginRequestFunction = (data: LoginFormData) => {
    console.log("Calling Login Submit");
    // TODO: Clean DATA!
    // TODO: Get and check response?
    postAuthRequest(data);
  };

  return (
    <>
      <h1>Welcome Home</h1>
      <LoginForm onSubmit={logInSubmit} />
    </>
  );
}

export default App;
