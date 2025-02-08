import { getPassengersData } from "@/services/userdata";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, NavigateFunction } from "react-router";

function Dashboard(): React.JSX.Element {
  // Check and Reroute to home screen
  // State of being loaded or not
  // And conditionally loaded... or not
  const navigate: NavigateFunction = useNavigate();

  // TODO: Should be a protection thing
  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      navigate("/");
    } else {
      getPassengersData({ thing: 1 });
    }
  });

  return (
    <div>
      <h1>This is Dashboard</h1>
    </div>
  );
}

export default Dashboard;
