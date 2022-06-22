import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  // CircularProgress,
  LinearProgress,
} from "@material-ui/core";

const CircularProgressWithLabel = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [leftValue, setLeftValue] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    leftPosition();
  }, [width, props.value]);

  const leftPosition = () => {
    if (Math.round(props.value) === 100) {
      if (width < 319) setLeftValue(`${Math.round(props.value - 11)}%`);
      else if (width < 418) setLeftValue(`${Math.round(props.value - 9)}%`);
      else if (width < 550) setLeftValue(`${Math.round(props.value - 6)}%`);
      else if (width < 750) setLeftValue(`${Math.round(props.value - 5)}%`);
      else if (width < 950) setLeftValue(`${Math.round(props.value - 4)}%`);
      else if (width < 1330) setLeftValue(`${Math.round(props.value - 3)}%`);
      else setLeftValue(`${Math.round(props.value - 2)}%`);
    } else if (Math.round(props.value) === 0) {
      setLeftValue(`${Math.round(props.value)}%`);
    } else if (Math.round(props.value) < 16) {
      setLeftValue(`${Math.round(props.value - 1)}%`);
    } else {
      if (width < 576) setLeftValue(`${Math.round(props.value - 9)}%`);
      else if (width < 767) setLeftValue(`${Math.round(props.value - 5)}%`);
      else if (width < 992) setLeftValue(`${Math.round(props.value - 3)}%`);
      else setLeftValue(`${Math.round(props.value - 1)}%`);
    }
  };

  return (
    <Box position="relative" display="inline-flex">
      {/* <CircularProgress */}
      <LinearProgress
        thickness="4"
        className="circularProgress"
        variant="determinate"
        style={{
          // color: "rgba(63, 63, 63, 0.8)",
          color: "rgba(255, 76, 110, 1)",
        }}
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          style={{
            color: "#000000",
            left: leftValue,
            // Math.round(props.value) === 100
            //   ? `${Math.round(props.value - 1.5)}%`
            //   : Math.round(props.value) === 0
            //   ? `${Math.round(props.value)}%`
            //   : width < 576
            //   ? `${Math.round(props.value - 9)}%`
            //   : width < 767 && width > 576
            //   ? `${Math.round(props.value - 5)}%`
            //   : width < 992 && width > 767
            //   ? `${Math.round(props.value - 3)}%`
            //   : `${Math.round(props.value - 1)}%`,
          }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
