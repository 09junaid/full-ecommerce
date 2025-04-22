import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function ResetPassword() {
  const { token } = useParams(); // Extract the token from URL params
  const [password, setPassword] = useState(""); // Store the password state
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password) {
      enqueueSnackbar("Please enter a new password", { variant: "error", autoHideDuration: 2000,
        anchorOrigin:{
          vertical:"bottom",
          horizontal:"right"
        }
      });
      return;
    }

    try {
      // Make API call to reset password
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/reset-password/${token}`, 
        { password }
      );

      // Display success message
      enqueueSnackbar(res.data.message, { variant: "success", autoHideDuration: 2000 });

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      // Handle error if request fails
      console.error("Reset password error:", error);
      enqueueSnackbar(error.response?.data?.message || "Failed to reset password", { variant: "error", autoHideDuration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleReset} className="space-y-4 cursor-pointer w-full max-w-md">
        <h2 className="text-xl font-bold">Reset Your Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        <button className="w-full bg-orange-500 text-white py-2 rounded">Reset Password</button>
      </form>
    </div>
  );
}
