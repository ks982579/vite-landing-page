import React, {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Container } from "@mui/material";
import postAuthRequest from "@/services/authenticate";
import Cookies from "js-cookie";
import { NavigateFunction, useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import LoginForm from "@/features/auth/components/LoginForm";
import { LoginFormData } from "@/features/auth/types";

type LoginSetter = Dispatch<SetStateAction<boolean>>;
type LoginRequestFunction = (data: LoginFormData) => void;

const HomePage: React.FC = (): JSX.Element => {
  const [loggedIn, setLoggedIn]: [boolean, LoginSetter] =
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

  return (
    <Container>
      <Navbar />
      <LoginForm onSubmit={logInSubmit} />
    </Container>
  );
};

export default HomePage;
