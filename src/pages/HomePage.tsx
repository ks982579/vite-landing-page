import React, {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import { Container } from "@mui/material";
import postAuthRequest from "@/services/authenticate";
import Cookies from "js-cookie";
import { NavigateFunction, useNavigate } from "react-router";
import LoginForm from "@/features/auth/components/LoginForm";
import {
  LoginErrors,
  LoginFormData,
  ClearErrorFn,
} from "@/features/auth/types";
import { AuthContextType, AuthContext } from "@/context/AuthContext";

type LoginSetter = Dispatch<SetStateAction<boolean>>;
type LoginRequestFunction = (data: LoginFormData) => void;

const HomePage: React.FC = (): JSX.Element => {
  const [loggedIn, setLoggedIn]: [boolean, LoginSetter] =
    useState<boolean>(false);
  const [requestLoading, setRequestLoading]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false);

  const [errorState, setErrorState]: [
    LoginErrors,
    Dispatch<SetStateAction<LoginErrors>>,
  ] = useState<LoginErrors>({
    isError: false,
    type: null,
  });

  let navigate: NavigateFunction = useNavigate();
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

  const clearError: ClearErrorFn = () => {
    if (errorState.isError && errorState.type === "credentials") {
      setErrorState({
        isError: false,
        type: null,
      });
    }
  };

  useEffect(() => {
    if (!user.isLoggedIn) {
      if (Cookies.get("accessToken")) {
        // Assuming cookie is OK
        user.login();
        navigate("/dashboard");
      }
    } else {
      // Double checking Cookie
      if (Cookies.get("accessToken")) {
        // Assuming cookie is OK
        navigate("/dashboard");
      }
    }
    return () => {};
  }, [navigate, loggedIn]);

  // Handling request to log in with credentials.
  const logInSubmit: LoginRequestFunction = async (data: LoginFormData) => {
    console.log("Calling Login Submit");
    // TODO: Clean DATA!
    // TODO: Get and check response?
    setRequestLoading(true);
    const res = await postAuthRequest(data);
    console.log(res);
    setRequestLoading(false);
    switch (res.type) {
      case "ok":
        console.log(res.value.status);
        setLoggedIn(true);
        break;
      case "err":
        // Either Raise an Alert or invalid credentials
        console.log(res.error.status);
        if (res.error.status && res.error.status === 401) {
          setErrorState({
            isError: true,
            type: "credentials",
          });
        } else {
          setErrorState({
            isError: true,
            type: "unknown",
          });
        }
        break;
    }
  };

  return (
    <Container>
      <LoginForm
        onSubmit={logInSubmit}
        loadingState={requestLoading}
        errorState={errorState}
        clearError={clearError}
      />
    </Container>
  );
};

export default HomePage;
