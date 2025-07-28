import React, { useEffect } from "react";
import ClientMainContent from "../layout/ClientMainContent";
import PrivateRoute from "./PrivateRoute";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login } from "../redux/userSlice";
import { api } from "../API/const";
import { fetchUserData } from "../API/userService";

const ClientInnerRoute = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndDispatchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          const userData = await fetchUserData(decodedUser.user_id);
          dispatch(login(userData));
        } catch (err) {
          console.error("Failed to decode token:", err);
          localStorage.removeItem("token");
        }
      }
    };

    fetchAndDispatchUser();
  }, [dispatch]);

  return (
    <>
      <ClientMainContent>
        <Outlet />
      </ClientMainContent>
    </>
  );
};

export default ClientInnerRoute;
