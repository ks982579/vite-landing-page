import { getPassengerData } from "@/services/userdata";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, NavigateFunction } from "react-router";

function Dashboard(): React.JSX.Element {
  // Check and Reroute to home screen
  // State of being loaded or not
  // And conditionally loaded... or not
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      navigate("/");
    } else {
      getPassengerData({ thing: 1 });
    }
  });

  return (
    <div>
      <h1>This is Dashboard</h1>
    </div>
  );
}

export default Dashboard;
