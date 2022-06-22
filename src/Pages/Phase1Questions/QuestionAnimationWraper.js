import * as React from "react";
import Question from "./Question";
import { Paper, Slide, Box } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { Tooltip, IconButton } from "@material-ui/core";
// import { ArrowBack } from "@material-ui/icons";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "50px",
//   },

//   black: {
//     color: "white",
//     backgroundColor: "black",
//     width: "30px",
//     height: "30px",
//     fontSize: "15px !important",
//   },

//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     // marginTop:"10px",
//     // margin: theme.spacing(3, 0, 2),
//     backgroundColor: "rgb(219, 77, 105)",
//     color: "white",
//     padding: "16px 24px",
//     borderRadius: "100px",
//     "&:hover": {
//       backgroundColor: "rgb(230, 77, 105)",
//     },
//   },
//   optionButton: {
//     marginRight: "15px",
//   },
//   avatar: {
//     backgroundColor: "white",
//   },
//   button: {
//     backgroundColor: "rgba(63, 63, 63, 0.1)",
//     color: "rgb(57 57 57 / 49%)",
//     cursor: "pointer",
//     "&:hover": {
//       backgroundColor: "rgb(219, 77, 105)",
//       color: "white",
//       cursor: "pointer",
//     },
//     float: "left",
//     position: "absolute",
//     left: 30,
//     top: 120,
//   },
//   textField: {
//     marginTop: "20px",
//     width: "500px",
//   },
//   root: {
//     height: 200,
//     width: 200,
//     marginBottom: "20px",
//     marginRight: "15px",
//     position: "relative",
//   },
//   media: {
//     height: "100%",
//     width: "100%",
//   },
// }));
export default function QuestionAnimationWraper(props) {
  const {
    handleProgressCount,
    setLocalState,
    localState,
    onBackButtonClick,
    questionObject,
    getUpdatedData,
  } = props;
  const { page, currentHeaderQuestion, questionsArray, headerQuestionArray } =
    localState;
  // const {handleBackButtonClick}=props
  // const classes = useStyles();
  const [show, setShow] = React.useState(true);
  const initLocalQuestionState = localStorage.getItem("localQuestionState")
    ? JSON.parse(localStorage.getItem("localQuestionState"))
    : null;
  const [localQuestionState, setLocalQuestionDataState] = React.useState(
    initLocalQuestionState
      ? initLocalQuestionState
      : {
          answer: null,
          inputValue: "",
          inputError: "",
          isDisabled: false,
        }
  );

  const handleChange = () => {
    setShow((prev) => !prev);
  };

  /* const getLastItem = (currentObj, currentArray, currentParentArray) => {
    if (currentObj && (currentObj.subQuestionbool || (currentObj.options && currentObj.options.find(i => i.subQuestionbool)))) {
      if (currentObj.options && currentObj.options.find(i => i.subQuestionbool)) {
        return getLastItem(currentObj.options.find(i => i.subQuestionbool), currentArray, currentParentArray)
      } else if (currentObj.subQuestionbool) {
        return getLastItem(currentObj.subQuestions[currentObj.subQuestions.length - 1], currentObj.subQuestions, currentArray)
      }
      else {
        return {
          currentParentArray,
          currentArray,
          currentQuestion: currentObj
        }
      }
    } else {
      return {
        currentQuestion: currentObj,
        currentArray,
        currentParentArray
      }
    }
  } */

  const handleBackButtonClick = () => {
    handleChange();
    setTimeout(() => {
      if (
        questionObject &&
        questionsArray &&
        questionObject.questionNumber &&
        page.questionPage
      ) {
        const indexArray = questionObject.questionNumber.split(".");

        if (questionsArray && indexArray && Number(indexArray[1]) === 1) {
          if (headerQuestionArray[currentHeaderQuestion.index]) {
            setLocalState({
              ...localState,
              currentHeaderQuestion:
                headerQuestionArray[currentHeaderQuestion.index],
              page: { ...page, questionPage: false, headerPage: true },
            });
          } else {
            setLocalState({
              ...localState,
              page: {
                ...page,
                getStarted: true,
                questionPage: false,
                headerPage: false,
                preSubmitAnswersPage: false,
              },
            });
          }
        } else {
          setLocalState({
            ...localState,
            currentParentArray: questionsArray,
            currentArray: questionsArray,
            currentQuestion: questionsArray[Number(indexArray[1]) - 2],
          });
          handleProgressCount("Back");
        }
      } else if (page && page.headerPage) {
        if (
          headerQuestionArray &&
          currentHeaderQuestion &&
          currentHeaderQuestion.index === 0
        ) {
          setLocalState({
            ...localState,
            page: {
              ...page,
              getStarted: true,
              headerPage: false,
              questionPage: false,
            },
          });
          // handleChange()
        } else if (
          headerQuestionArray &&
          currentHeaderQuestion &&
          currentHeaderQuestion.index > 0
        ) {
          const updatedArray = getUpdatedData(
            headerQuestionArray[currentHeaderQuestion.index - 1].questions,
            currentHeaderQuestion.index,
            `currentHeaderQuestion`
          );
          // const temp = getLastItem(updatedArray[updatedArray.length - 1], updatedArray, updatedArray)
          setLocalState({
            ...localState,
            currentHeaderQuestion:
              headerQuestionArray[currentHeaderQuestion.index - 1],
            currentQuestion: updatedArray[updatedArray.length - 1],
            questionsArray: updatedArray,
            currentArray: updatedArray,
            currentParentArray: updatedArray,
            page: {
              ...page,
              headerPage: false,
              questionPage: true,
            },
            // ...temp
          });
          handleProgressCount("Back");
          // handleChange()
        } else {
          if (onBackButtonClick) {
            onBackButtonClick();
          }
          handleProgressCount("Back");
          // handleChange()
        }
      } /* else if (page && page.getStarted) {
        setLocalState({
          ...localState,
          page: {
            ...page,
            landing: true,
            getStarted: false,
            questionPage: false,
            headerPage: false,
          },
        });
        // handleChange()
      } */ else if (
        page &&
        (page.preSubmitAnswersPage || page.submitAnswersPage)
      ) {
        if (onBackButtonClick) {
          onBackButtonClick();
        }
        // handleChange()
      } /* else if (page && page.landing) {
        if (onBackButtonClick) {
          onBackButtonClick();
        }
        // handleChange()
      } */ else if (page && page.getStarted) {
        if (onBackButtonClick) {
          onBackButtonClick();
        }
        // handleChange()
      }
      handleChange();
    }, 500);
  };
  const QuestionDiv = (
    <Paper
      sx={{ m: 1 }}
      elevation={0}
      style={{
        backgroundColor: "rgb(255 255 255 / 0%)",
      }}
    >
      <Question
        {...{ ...props, localQuestionState, setLocalQuestionDataState }}
        handleChange={handleChange}
        show={show}
        handleBackButtonClick={handleBackButtonClick}
      />
    </Paper>
  );
  return (
    <Box sx={{ height: 180 }} className={"animationContainer"}>
      {/* {page &&
        (show ? (
          <Tooltip arrow title={"Back"} placement="bottom-center">
            <IconButton
              className={[
                classes.button,
                "backButtonClass",
                page.landing || page.getStarted ? "topLeftCorner" : "",
                page.headerPage ? "headerQuestionBack" : "",
              ].join(" ")}
              aria-label="back"
              onClick={() => {
                handleBackButtonClick();
              }}
            >
              <ArrowBack />
              Back
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            disabled={true}
            className={[
              classes.button,
              "backButtonClass",
              page.landing || page.getStarted ? "topLeftCorner" : "",
              page.headerPage ? "headerQuestionBack" : "",
            ].join(" ")}
          >
            <ArrowBack />
            Back
          </IconButton>
        ))} */}
      <Box sx={{ width: `calc(100px + 16px)` }}>
        <Slide
          direction={show ? "up" : "down"}
          in={show}
          timeout={{ appear: 150, enter: 100, exit: 200 }}
        >
          {QuestionDiv}
        </Slide>
      </Box>
    </Box>
  );
}
