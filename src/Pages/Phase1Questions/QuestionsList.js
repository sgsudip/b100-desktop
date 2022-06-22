import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import QuestionAppHeader from "../../Components/Header/index";
import Question from "./QuestionAnimationWraper";
import CircularProgressWithLabel from "../../Components/CircularProgressWithLabel/Index";
import Header from "../../Components/Header/index";
import SubmitPage from "./SubmitPage";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "rgb(233, 233, 233)",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(219, 77, 105)",
    color: "white",
    padding: "16px 24px",
    borderRadius: "100px",
    "&:hover": {
      backgroundColor: "rgb(230, 77, 105)",
    },
  },
  avatar: {
    backgroundColor: "white",
  },
}));
const QuestionList = (props) => {
  const {
    history,
    handleProgressCount,
    progress,
    getUpdatedData,
    localState,
    setIsLoggedIn,
    setPage,
    setLocalState,
  } = props;
  const classes = useStyles();

  const {
    headerQuestionArray,
    page,
    currentHeaderQuestion,
    questionsArray,
    currentQuestion,
  } = localState;

  return (
    <>
      <Header />
      {!(page.landing || page.getStarted) && (
        <div className="progressbarContainer">
          <CircularProgressWithLabel value={progress} />
        </div>
      )}
      {page && !(page.getStarted || page.landing || page.headerPage) && (
        <QuestionAppHeader
          title={currentHeaderQuestion.title}
          subTitle={currentHeaderQuestion.subTitle}
          classes={classes}
          setIsLoggedIn={setIsLoggedIn}
          history={history}
        />
      )}
      {
        /* page.landing ? (
        <Question
          landingTitle={true}
          nextActionText="Next"
          localState={localState}
          setLocalState={setLocalState}
          onNextButtonClick={() =>
            setPage({
              ...page,
              landing: !page.landing,
              getStarted: true,
            })
          }
          onBackButtonClick={() => {
            if (history) {
              history.push("/getstarted");
            }
          }}
          {...{
            getUpdatedData,
          }}
        />
      ) : */ page.getStarted ? (
          <Question
            getStartedTitle={
              "This is your first step to accurately knowing the status of your heart health."
            }
            subTitle={"Let's Get Started."}
            nextActionText="Next"
            localState={localState}
            setLocalState={setLocalState}
            onNextButtonClick={() =>
              setPage({
                ...page,
                getStarted: !page.getStarted,
                headerPage: true,
              })
            }
            onBackButtonClick={() => {
              if (history) {
                history.push("/getstarted");
              }
            }}
            {...{
              getUpdatedData,
            }}
          />
        ) : page.headerPage && currentHeaderQuestion ? (
          <Question
            getStartedTitle={currentHeaderQuestion.title}
            subTitle={currentHeaderQuestion.subTitle}
            handleProgressCount={handleProgressCount}
            nextActionText="Next"
            localState={localState}
            setLocalState={setLocalState}
            onNextButtonClick={() => {
              if (currentHeaderQuestion.questions.length) {
                const updatedArray = getUpdatedData(
                  currentHeaderQuestion.questions,
                  currentHeaderQuestion.index + 1,
                  `currentHeaderQuestion`
                );
                setLocalState({
                  ...localState,
                  currentQuestion: updatedArray[0],
                  questionsArray: updatedArray,
                  currentArray: updatedArray,
                  currentParentArray: updatedArray,
                  page: {
                    ...page,
                    headerPage: false,
                    questionPage: true,
                  },
                });
              } else {
                if (headerQuestionArray[currentHeaderQuestion.index + 1]) {
                  setLocalState({
                    ...localState,
                    currentHeaderQuestion:
                      headerQuestionArray[currentHeaderQuestion.index + 1],
                  });
                } else {
                  setLocalState({
                    ...localState,
                    page: {
                      ...page,
                      questionPage: false,
                      headerPage: false,
                      preSubmitAnswersPage: true,
                    },
                  });
                }
              }
            }}
            onBackButtonClick={() => {
              if (
                page &&
                page.headerPage &&
                !(
                  headerQuestionArray &&
                  currentHeaderQuestion &&
                  currentHeaderQuestion.index === 0
                )
              ) {
                const updatedArray = getUpdatedData(
                  headerQuestionArray[currentHeaderQuestion.index - 1]
                    .questions,
                  currentHeaderQuestion.index,
                  `currentHeaderQuestion`
                );
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
                });
                handleProgressCount("Back");
              }
            }}
            {...{
              getUpdatedData,
            }}
          />
        ) : page.questionPage &&
          currentHeaderQuestion &&
          currentHeaderQuestion &&
          currentQuestion &&
          questionsArray &&
          questionsArray.length ? (
          <Question
            optionsArray={
              currentQuestion && currentQuestion.options
                ? currentQuestion.options
                : []
            }
            nextActionText={
              (currentQuestion ? currentQuestion : questionsArray[0])
                .questionType === "HIDDEN"
                ? "Next"
                : (currentQuestion ? currentQuestion : questionsArray[0])
                    .questionType === "YES-NO" ||
                  (currentQuestion ? currentQuestion : questionsArray[0])
                    .questionType === "SINGLE-CHOICE"
                ? ""
                : "Next"
            }
            questionObject={
              currentQuestion ? currentQuestion : questionsArray[0]
            }
            handleProgressCount={handleProgressCount}
            localState={localState}
            setLocalState={setLocalState}
            {...{
              getUpdatedData,
            }}
          />
        ) : page.preSubmitAnswersPage && page.preSubmitAnswersPage ? (
          <SubmitPage
            {...props}
            onBackButtonClick={() => {
              if (
                page &&
                page.preSubmitAnswersPage &&
                !(
                  headerQuestionArray &&
                  currentHeaderQuestion &&
                  currentHeaderQuestion.index === 0
                )
              ) {
                const updatedArray = getUpdatedData(
                  headerQuestionArray[headerQuestionArray.length - 1].questions,
                  headerQuestionArray[headerQuestionArray.length - 1].index + 1,
                  `currentHeaderQuestion`
                );
                setLocalState({
                  ...localState,
                  currentHeaderQuestion:
                    headerQuestionArray[headerQuestionArray.length - 1],
                  currentQuestion: updatedArray[updatedArray.length - 1],
                  questionsArray: updatedArray,
                  currentArray: updatedArray,
                  currentParentArray: updatedArray,
                  page: {
                    ...page,
                    headerPage: false,
                    questionPage: true,
                  },
                });
                handleProgressCount("Back");
              }
            }}
          />
        ) : // <Question
        //   // getStartedTitle={
        //   //   "You will receive a notification when your assesment has been reviewed and your LubDub grade has been recorded.  You will also receive informative suggestions from Dr. B you can use to optimize your heart health! If you do not receive a notification after 24 hours, please email us at: support@B100method.com"
        //   // }
        //   getStartedTitle={"All done with your heart health risk assesment!"}
        //   // subTitle={"THANK YOU"}
        //   subTitle={
        //     "You will receive a notification when your assesment has been reviewed and your LubDub grade has been recorded.  You will also receive informative suggestions from Dr. B you can use to optimize your heart health! If you do not receive a notification after 24 hours, please email us at: support@B100method.com"
        //   }
        //   handleProgressCount={handleProgressCount}
        //   // nextActionText="NEXT"
        //   nextActionText="SUBMIT"
        //   history={history}
        //   localState={localState}
        //   setLocalState={setLocalState}
        //   // onNextButtonClick={() => {
        //   //   setLocalState({
        //   //     ...localState,
        //   //     page: {
        //   //       ...page,
        //   //       questionPage: false,
        //   //       headerPage: false,
        //   //       preSubmitAnswersPage: false,
        //   //       submitAnswersPage: true,
        //   //     },
        //   //   });
        //   // }}
        //   onBackButtonClick={() => {
        //     if (
        //       page &&
        //       page.preSubmitAnswersPage &&
        //       !(
        //         headerQuestionArray &&
        //         currentHeaderQuestion &&
        //         currentHeaderQuestion.index === 0
        //       )
        //     )
        //       const updatedArray = getUpdatedData(
        //         headerQuestionArray[headerQuestionArray.length - 1].questions,
        //         headerQuestionArray[headerQuestionArray.length - 1].index + 1,
        //         `currentHeaderQuestion`
        //       );
        //       setLocalState({
        //         ...localState,
        //         currentHeaderQuestion:
        //           headerQuestionArray[headerQuestionArray.length - 1],
        //         currentQuestion: updatedArray[updatedArray.length - 1],
        //         questionsArray: updatedArray,
        //         currentArray: updatedArray,
        //         currentParentArray: updatedArray,
        //         page: {
        //           ...page,
        //           headerPage: false,
        //           questionPage: true,
        //         },
        //       });
        //       handleProgressCount("Back");
        //     }
        //   }}
        //   {...{
        //     getUpdatedData,
        //   }}
        // />
        page.submitAnswersPage && page.submitAnswersPage ? (
          <Question
            submitAnswerTitle={"LIVE TO BE 100. WITH B100!"}
            submitAnswerSubTitle={"Launching in July of 2020!"}
            handleProgressCount={handleProgressCount}
            nextActionText="SUBMIT"
            localState={localState}
            history={history}
            setLocalState={setLocalState}
            getUpdatedData
            onBackButtonClick={() => {
              setLocalState({
                ...localState,
                page: {
                  ...page,
                  questionPage: false,
                  headerPage: false,
                  preSubmitAnswersPage: true,
                  submitAnswersPage: false,
                },
              });
            }}
            {...{
              getUpdatedData,
            }}
          />
        ) : null
      }
    </>
  );
};

export default QuestionList;
