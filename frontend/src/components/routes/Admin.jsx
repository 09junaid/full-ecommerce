import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/auth/admin-auth`);
        setOk(response.data.ok);
      } catch (error) {
        console.error("Auth check failed:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=''/>;
}
// This component checks if the user is authenticated by making a request to the backend.
// If the user is authenticated, it renders the child components using <Outlet />.