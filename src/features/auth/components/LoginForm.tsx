import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { JSXNode } from "@/types";
import { LoginFormData, LoginFormProps } from "../types";

export default function LoginForm({
  onSubmit,
  loadingState,
  errorState,
  clearError,
}: LoginFormProps): JSXNode {
  // State
  const [formData, setFormData]: [
    LoginFormData,
    Dispatch<SetStateAction<LoginFormData>>,
  ] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handlers
  const handleChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    clearError();

    setFormData((prev: LoginFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Setting Error Message required so it doesn't change when component collapses.
  useEffect(() => {
    if (errorState.isError) {
      if (errorState.type && errorState.type === "credentials") {
        setErrorMessage("Login Credentials are Invalid");
      } else {
        setErrorMessage(
          "Unknown Error - Please try again later or contact and Administrator",
        );
      }
    }
  });

  // Container centers content horizontally = MOST BASIC LAYOUT ELEMENT
  // Paper displays elements on *elevated* surface
  // Box is generic Theme-aware container
  return (
    <Container maxWidth="sm">
      <Paper elevation={12} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" component="h4">
          Login
        </Typography>
        <Collapse in={errorState.isError} unmountOnExit>
          <Alert severity="error">{errorMessage}</Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
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
        </form>
        {loadingState && <LinearProgress sx={{ mt: 2 }} />}
      </Paper>
    </Container>
  );
}
