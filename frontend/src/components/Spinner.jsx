import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from 'notistack';

export default function Spinner({path="login"}) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location=useLocation();
  const [auth] = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);

    if (count === 0) {
      if (!auth?.token || auth?.user?.role !== 'admin') {
        enqueueSnackbar("Access denied. Admins only.", { variant: 'error',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          }
         });
        navigate(`/${path}`,{
          state:location.pathname
        });
      }
    }

    return () => clearInterval(interval);
  }, [count, navigate, auth, enqueueSnackbar,location,path]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner text-warning animate-spin"></span>
    </div>
  );
}
// This component shows a loading spinner while checking authentication status.