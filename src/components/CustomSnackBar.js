import React from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { titleCase } from "../utils/utils";
import PropTypes from 'prop-types';

const CustomSnackBar = (props) => {
  const { open, severity, onClose } = props;

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}
     anchorOrigin={{ horizontal: "center", vertical: "bottom" }}>
      <Alert onClose={onClose} severity={severity}>
        <AlertTitle>{titleCase(severity)}</AlertTitle>
        {props.children}
      </Alert>
    </Snackbar>
  );
};

CustomSnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.oneOf(["success","warning","info","error"]).isRequired,
  onClose: PropTypes.func.isRequired,
}
export default CustomSnackBar;
