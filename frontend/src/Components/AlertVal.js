import React from "react";
import Alert from "@mui/material/Alert";

function AlertVal(props) {
  return (
    <>
      <Alert
        variant="outlined"
        severity="warning"
        sx={{
          width: "20%",
          position: "absolute",
          top: "85px",
          right: "20px",
          transition: "all 0.5s ease-in-out",
        }}
      >
       {props.msg}
      </Alert>
    </>
  );
}

export default AlertVal;
