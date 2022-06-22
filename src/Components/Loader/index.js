import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = () => {
  return (
    <div className="maindiv loader-div">
      <CircularProgress size={70} color="inherit" />
    </div>
  );
};

export default Loader;
