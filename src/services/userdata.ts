import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import { Result, Ok, Err } from "@/types/result";
import { PassengerList } from "@/types/passenger";
import { TripList } from "@/types/trip";
import { GenericResponseError } from "@/types";
import { secrets } from "@/secrets";

async function getDataFrom<T, E>(
  url: string,
  signal?: AbortSignal,
): Promise<Result<AxiosResponse<T>, AxiosError<E>>> {
  try {
    const res: AxiosResponse<T> = await axios.get<T>(
      url,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": secrets.apiKey,
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        signal,
      }, // CONFIG
    );
    return Ok(res);
  } catch (error: unknown) {
    const err = error as AxiosError<E>;
    // Seems like the Cookie breaks before expiry?
    // Remove Cookie if expired
    if (err.response?.status === 401) {
      Cookies.remove("accessToken");
    }
    return Err(err);
  }
}

export async function getPassengersData(
  signal: AbortSignal,
): Promise<
  Result<AxiosResponse<PassengerList>, AxiosError<GenericResponseError>>
> {
  return getDataFrom<PassengerList, GenericResponseError>(
    `${secrets.apiEndpoint}v1/travel/passengers/`,
    signal,
  );
}

export async function getTripsData(
  signal: AbortSignal,
): Promise<Result<AxiosResponse<TripList>, AxiosError<GenericResponseError>>> {
  return getDataFrom<TripList, GenericResponseError>(
    `${secrets.apiEndpoint}v1/travel/trips`,
    signal,
  );
}
