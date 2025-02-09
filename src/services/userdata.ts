import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import { Result, Ok, Err } from "@/types/result";
import { Passenger } from "@/types/passenger";
import { Trip } from "@/types/trip";
import { GenericResponseError } from "@/types";

async function getDataFrom<T, E>(
  url: string,
): Promise<Result<AxiosResponse<T>, AxiosError<E>>> {
  console.log(`Making GET request to: ${url}`);
  try {
    const res: AxiosResponse<T> = await axios.get<T>(
      url,
      {
        headers: {
          "Content-Type": "application/json",
          // API Key should be someone secret and not duplicated
          "x-api-key": "Zgz4NhoIqZ1PJ6vw49K9N9hdWB7dGnWD29kXxg7X",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }, // CONFIG
    );
    console.log("OK Submission");
    console.log(res);
    console.log(res.data);
    return Ok(res);
  } catch (error: unknown) {
    const err = error as AxiosError<E>;
    console.error("Error Submission");
    console.log(err);
    console.log(err.response?.status);
    // console.log(err.response?.data.message);
    // Seems like the Cookie breaks before expiry?
    // Remove Cookie if expired
    if (err.response?.status === 401) {
      Cookies.remove("accessToken");
    }
    return Err(err);
  }
}

export async function getPassengersData(): Promise<
  Result<AxiosResponse<Passenger>, AxiosError<GenericResponseError>>
> {
  return getDataFrom<Passenger, GenericResponseError>(
    "https://sandbox.blinkapi.co/v1/travel/passengers",
  );
}

export async function getTripsData(): Promise<
  Result<AxiosResponse<Trip>, AxiosError<GenericResponseError>>
> {
  return getDataFrom<Trip, GenericResponseError>(
    "https://sandbox.blinkapi.co/v1/travel/trips",
  );
}
