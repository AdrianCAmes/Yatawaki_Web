import React, { useState } from "react";
import CustomSnackBar from "../components/CustomSnackBar";

const SnackBarContext = React.createContext({
  onOpen: null,
  onClose: null,
});

export const SnackBarContextProvider = (props) => {
  const initSnackBar = {
    open: false,
    severity: "info",
    message: "",
    onClose: () => {},
  };
  const [snackBar, setSnackBar] = useState(initSnackBar);

  const onOpen = ({ severity, message }) => {
    setSnackBar({
      ...snackBar,
      open: true,
      severity: severity,
      message: message,
      onClose: onClose,
    });
  };

  const onClose = () => {
    setSnackBar({ ...snackBar, open: false });
  };

  return (
    <SnackBarContext.Provider value={{ onClose: onClose, onOpen: onOpen }}>
      <CustomSnackBar
        open={snackBar.open}
        severity={snackBar.severity}
        onClose={snackBar.onClose}
      >
        {snackBar.message}
      </CustomSnackBar>
      {props.children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarContext;