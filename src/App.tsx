import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SWRConfig } from "swr";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ToastProvider } from "./contexts/ToastContext";

import { useUser } from "./hooks/useUser";
import { useCart } from "./hooks/useCart";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Products } from "./pages/Products";
import { Profile } from "./pages/Profile";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Cart } from "./pages/Cart";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#023047',
    },
    secondary: {
      main: '#a8dadc',
    },
  }
});

export const App = () => {
  const { user } = useUser();

  const { cart } = useCart();

  return (
    <BrowserRouter>
      <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false, dedupingInterval: 0 }}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <Header user={user} cart={cart} />
            <Routes>
              <Route path="/" element={<Products user={user} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/cart" element={<Cart user={user} cart={cart} />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<Navigate replace to="/not-found" />} />
            </Routes>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </SWRConfig>
    </BrowserRouter>
  );
}
