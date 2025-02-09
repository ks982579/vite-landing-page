import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { JSXNode } from "@/types";

// Used in Services...
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

type LoginRequestFunction = (data: LoginFormData) => void;

export default function LoginForm({ onSubmit }: LoginFormProps): JSXNode {
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
      <Paper elevation={12} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" component="h4" sx={{ border: 1 }}>
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
