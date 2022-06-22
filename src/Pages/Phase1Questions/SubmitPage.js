import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { ArrowBack, ArrowForward, CheckCircle } from "@material-ui/icons";
import { postAnswers } from "../../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";

const SubmitPage = (props) => {
  const dispatch = useDispatch();
  const {
    questionsList: { Headers },
    onBackButtonClick,
    history,
    localState,
  } = props;

  const { authUser } = useSelector(
    ({ authenticationData }) => authenticationData
  );
  const [progress, setProgress] = useState(0);
  const [opacityState, setOpacityState] = useState(false);

  useEffect(() => {
    if (progress !== 100) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 1
        );
      }, 50);
      return () => clearInterval(timer);
    }
  }, [progress]);

  useEffect(() => {
    setTimeout(() => setOpacityState(true), 3990);
  }, []);

  return (
    <>
      <div className="text-center mx-auto cal-result">
        <Typography component="h2" variant="h2" className="results-title">
          Calculating results...
        </Typography>
        <Box
          sx={{ position: "relative", display: "inline-flex" }}
          className="circularProgress-bar"
        >
          <CircularProgress
            thickness={2}
            size={200}
            value={progress}
            variant="determinate"
            style={{
              color: "rgba(255, 76, 110, 1)",
            }}
          />

          <Typography variant="caption" component="div">
            {/* 100% */}
            {progress}%
          </Typography>
        </Box>
        <div className="icon-list">
          {Headers.filter(
            (item) => !item.title.toLowerCase().includes("trivia")
          ).map((item) => (
            <Typography
              key={item._id}
              className={`heading-primary-main ${
                opacityState ? "visibleOpacity" : "invisibleOpacity"
              }`}
            >
              <CheckCircle className="mr-3 " /> {item.title}{" "}
            </Typography>
          ))}
        </div>
        <div>
          <Button
            startIcon={<ArrowBack />}
            variant="contained"
            className="backSubmit"
            onClick={() => onBackButtonClick()}
          >
            Back
          </Button>
          <Button
            className="nextSubmit"
            endIcon={<ArrowForward />}
            onClick={() => {
              if (history) {
                dispatch(
                  postAnswers(localState.answerArray, authUser, history)
                );
                localStorage.removeItem("localState");
                localStorage.removeItem("localQuestionState");
                localStorage.removeItem("progress");
                if (history) {
                  window.open("https://b100method.com/");
                }
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default SubmitPage;
