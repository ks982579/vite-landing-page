import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

export function getPassengerData(data: any) {
  console.log(data);
  axios
    .get(
      "https://sandbox.blinkapi.co/v1/travel/passengers", // URL
      {
        headers: {
          "Content-Type": "application/json",
          // API Key should be someone secret and not duplicated
          "x-api-key": "Zgz4NhoIqZ1PJ6vw49K9N9hdWB7dGnWD29kXxg7X",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }, // CONFIG
    )
    .then((res: AxiosResponse<any>) => {
      console.log("OK Submission");
      console.log(res);
      console.log(res.data);
    })
    .catch((err: AxiosError<any>) => {
      console.error("Error Submission");
      console.log(err);
      console.log(err.response?.status);
      console.log(err.response?.data.message);
      // Seems like the Cookie breaks before expiry?
      Cookies.remove("accessToken");
    });
}
