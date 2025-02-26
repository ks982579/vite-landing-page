// src/services/authenticate.ts
import axios, { AxiosResponse, AxiosError } from "axios";
import { Result, Ok, Err } from "@/types/result";
import { LoginFormData } from "@/features/auth/types";
import { secrets } from "@/secrets";

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

// In AxiosError.response?.data...
interface LoginErrorResponse {
  code: string;
  message: string;
  name: string;
}

async function postAuthRequest(
  data: LoginFormData,
): Promise<
  Result<AxiosResponse<LoginResponseData>, AxiosError<LoginErrorResponse>>
> {
  try {
    const res: AxiosResponse<LoginResponseData> =
      await axios.post<LoginResponseData>(
        `${secrets.apiEndpoint}v1/platform/user/login`,
        {
          emailAddress: data.email,
          password: data.password,
          partnerId: secrets.partnerId,
        }, // DATA
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": secrets.apiKey,
          },
        }, // CONFIG
      );

    // Chrome doesn't support setting Cookies
    // TODO: Improve Security
    console.log("setting access token");
    localStorage.setItem("accessToken", res.data.accessToken);
    console.log(localStorage.getItem("accessToken"));

    return Ok(res);
  } catch (error: unknown) {
    const err = error as AxiosError<LoginErrorResponse>;

    return Err(err);
  }
}

export default postAuthRequest;
