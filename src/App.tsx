// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React, { Dispatch, JSX, SetStateAction, useState } from "react";
import "./App.css";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";

// TODO: Add to types area
type JSXNode = JSX.Element | null;

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

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
              error
              helperText="Incorrect Entry"
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
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
}

// hoisted
function App() {
  // const [count, setCount] = useState(0);
  const thing = () => {
    console.log("thing");
  };

  return (
    <>
      <h1>Welcome Home</h1>
      <LoginForm onSubmit={thing} />
      <div></div>
    </>
  );
}

export default App;
