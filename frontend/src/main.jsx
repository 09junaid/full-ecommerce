import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
