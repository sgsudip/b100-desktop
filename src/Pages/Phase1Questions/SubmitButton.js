import React from "react";
import { Button } from "@material-ui/core";
/* import {
  FETCH_START,
  FETCH_SUCCESS,
  SET_PHASE_1_SCORE,
} from "../../Redux/ActionTypes"; */
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { /* NavigateNext, */ Done, ArrowForward } from "@material-ui/icons";
// import * as API from "../../constants/api";
import { postAnswers } from "../../Redux/Actions";

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: "rgb(219, 77, 105)",
    color: "white",
    padding: "16px 24px",
    borderRadius: "100px",
    textTransform: "initial",
    "&:hover": {},
  },
}));
const Questions = (props) => {
  const {
    history,
    nextActionText,
    localState,
    questionObject,
    handleNextButtonClick,
    options,
    setAnswer,
    localQuestionState,
    // setLocalQuestionState,
    setOptions,
    page,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  let { loading } = useSelector(({ commonData }) => commonData);
  let { authUser } = useSelector(
    ({ authenticationData }) => authenticationData
  );
  const { answer, isDisabled } = localQuestionState;

  return (
    <>
      {questionObject && nextActionText && (
        <div className="nextButtonSpacing">
          <Button
            type="submit"
            variant={"contained"}
            size="large"
            className={[classes.submit, "submitButton", "fontMuli"].join(" ")}
            endIcon={<ArrowForward />}
            disabled={
              !questionObject.question.includes(
                "The people in our lives have a great impact on our state of mind."
              ) &&
              (!(
                (questionObject.questionType === "MULTI-CHOICE"
                  ? questionObject.question
                      .toLowerCase()
                      .includes(
                        "let us have some fun, pick five words from the list below that best describe your personality."
                      ) &&
                    options.filter((o) => o.selected) &&
                    options.filter((o) => o.selected).length < 5
                    ? false
                    : options.length
                  : true) &&
                ((answer && answer.length) || options.find((o) => o.selected))
              )
                ? questionObject.subQuestions.length
                  ? false
                  : true
                : !(
                    (questionObject.questionType === "FILL-IN" ||
                      questionObject.questionType === "HIDDEN") &&
                    !questionObject.subQuestions.length &&
                    !(answer && answer.length)
                  )
                ? false
                : true || isDisabled)
            }
            onClick={() => {
              handleNextButtonClick(
                questionObject.questionType === "SINGLE-CHOICE"
                  ? options.find((o) => o.selected)
                  : questionObject.questionType === "MULTI-CHOICE"
                  ? options.filter((o) => o.selected)
                  : null || answer
              );
              setAnswer(null);
              setOptions([]);
            }}
          >
            {nextActionText
              ? nextActionText
              : !(questionObject && options.length)
              ? " "
              : ""}
          </Button>
          {(localState &&
            localState.questionsArray &&
            questionObject &&
            questionObject.question &&
            questionObject.question.toLowerCase().includes(" aisle")) ||
          questionObject.question.toLowerCase().includes("department") ? (
            <Button
              classes={{ root: "skipButton" }}
              onClick={() => {
                handleNextButtonClick(null);

                setAnswer(null);
                setOptions([]);
              }}
              className="fontCustom"
            >
              {/* Skip Isle */}
              Nothing from this Aisle
            </Button>
          ) : null}
        </div>
      )}
      <div
        className={`align-items-center nextButtonSpacing rounded-btn ${
          page.landing ? "justify-content-center" : ""
        }`}
        style={{
          webkitFontSmoothing: "antialiased",
          fontWeight: 700,
          fontFamily: "muli",
          ...(nextActionText === "SUBMIT"
            ? {
                // marginTop: "4em",
                margin: "1.5em 0 0 0",
              }
            : {}),
        }}
      >
        {!questionObject && nextActionText && (
          <Button
            type="submit"
            variant={"contained"}
            size="large"
            className={[classes.submit, "submitButton", "fontMuli"].join(" ")}
            endIcon={
              nextActionText !== "SUBMIT" ? (
                <ArrowForward />
              ) : (
                <Done style={{ fontSize: "20px" }} />
              )
            }
            disabled={loading}
            onClick={async () => {
              if (nextActionText === "SUBMIT") {
                if (history) {
                  dispatch(
                    postAnswers(localState.answerArray, authUser, history)
                  );
                  localStorage.removeItem("localState");
                  localStorage.removeItem("localQuestionState");
                  localStorage.removeItem("progress");
                  // alert(
                  //   "Your questionnaire is completed and answers are saved successfully. You'll receive your grades in 24 hours."
                  // );
                  if (history) {
                    // history.push("/getstarted");
                    // window.location = "https://b100method.com/";
                    window.open("https://b100method.com/");
                  }
                }
              } else {
                handleNextButtonClick(answer);

                setAnswer(null);
                setOptions([]);
              }
            }}
          >
            {nextActionText
              ? nextActionText
              : !(questionObject && options.length)
              ? "Continue"
              : ""}
          </Button>
        )}
        {/* {nextActionText === "SUBMIT" && (
          <span
            className="ml-2"
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "rgba(57, 57, 57, 0.7)",
            }}
          >
            Press{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              ENTER
            </span>{" "}
            key to submit
          </span>
        )} */}
      </div>
      {nextActionText === "SUBMIT" && (
        <span
          className="my-4 questionDescriptionText nextButtonSpacing"
          style={{
            fontSize: "12px",
          }}
        >
          Never submit passwords! -{" "}
          <a
            style={{
              textDecoration: "underline",
              color: "rgba(57, 57, 57, 0.7)",
            }}
            target="_blank"
            rel="noreferrer"
            href="https://complaints.surveysparrow.com/s/Report-Abuse/tt-3ffc2e?token=tt-31c313&amp;submission_id=PREVIEW"
          >
            Report abuse
          </a>
        </span>
      )}
    </>
  );
};

export default Questions;
