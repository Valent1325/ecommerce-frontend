import React, { createContext, useContext, useState } from "react";

import { Alert, AlertColor, Snackbar } from "@mui/material";

type Context = {
  active: boolean;
  type?: AlertColor;
  message: string;
  setToast(message: string, type?: AlertColor): void;
  removeToast(): void;
};

export const ToastContext = createContext<Context | undefined>(undefined);
ToastContext.displayName = "ToastContext";

export const ToastProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<Context>({
    active: false,
    message: "",
    setToast: () => null,
    removeToast: () => null,
  });

  const removeToast = () => {
    setState({ ...state, active: false });
  };

  const setToast = (message: string, type?: AlertColor) => {
    setState({ ...state, type, message, active: true });
    setTimeout(() => {
      removeToast();
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ ...state, setToast, removeToast }}>
      <Snackbar open={state.active} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={removeToast}>
        <Alert onClose={removeToast} severity={state.type}>
          {state.message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("[useToast] Вызов должен быть внутри ToastProvider");
  }
  return context;
};
