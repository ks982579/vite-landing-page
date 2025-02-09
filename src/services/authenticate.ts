// src/services/authenticate.ts
import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import { Result, Ok, Err } from "@/types/result";

interface User {
  read: boolean;
  write: boolean;
}

// In AxiosResponse.data...
interface LoginResponseData {
  accessGroupId: string;
  accessToken: string;
  accessTokenExpiry: number;
  federated: number;
  id: string;
  partnerId: string;
  roles: User;
  status: string;
  userId: string;
}

// interface AxiosResponse {
//   data: LoginResponseData;
//   status: number;
//   statusText: string;
//   headers: any;
//   config: any;
//   request: XMLHttpRequest;
// }

// In AxiosError.response?.data...
interface LoginErrorResponse {
  code: string;
  message: string;
  name: string;
}

// Used in <App />
interface LoginFormData {
  email: string;
  password: string;
}

async function postAuthRequest(
  data: LoginFormData,
): Promise<
  Result<AxiosResponse<LoginResponseData>, AxiosError<LoginErrorResponse>>
> {
  try {
    const res: AxiosResponse<LoginResponseData> =
      await axios.post<LoginResponseData>(
        "https://sandbox.blinkapi.co/v1/platform/user/login", // URL
        {
          emailAddress: data.email,
          password: data.password,
          partnerId: "blink-travel-new",
        }, // DATA
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "Zgz4NhoIqZ1PJ6vw49K9N9hdWB7dGnWD29kXxg7X",
          },
        }, // CONFIG
      );
    console.log("OK Submission");
    console.log(res);

    // TODO: Improve Security
    Cookies.set("accessToken", res.data.accessToken, {
      expires: new Date(res.data.accessTokenExpiry * 1000),
    });

    return Ok(res);

    // console.log(res.data);
  } catch (error: unknown) {
    const err = error as AxiosError<LoginErrorResponse>;
    console.error("Error Submission");
    console.log(err);
    console.log(err.response?.status);
    console.log(err.response?.data.message);

    return Err(err);
  }
}

export default postAuthRequest;
