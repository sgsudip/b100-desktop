import React from "react";
import Loader from "../../Components/Loader";
import { IconButton, Tooltip } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import QuestionsList from "./QuestionsList";
const Questions = (props) => {
  const {
    history,
    loading,
    LogOut,
    progress,
    handleProgressCount,
    questionsList,
    setIsLoggedIn,
  } = props;
  const getUpdatedData = (questionsArray, pageNumberStart, childOfString) => {
    if (questionsArray && questionsArray.length) {
      const updated = questionsArray.map((question, index) => {
        if (
          (question.subQuestions && question.subQuestionbool) ||
          (question.options && question.options.length)
        ) {
          const item = {
            ...question,
            subQuestions: getUpdatedData(
              question.subQuestions,
              (pageNumberStart ? pageNumberStart + "." : "") + (index + 1),
              childOfString === `currentHeaderQuestion`
                ? `${childOfString}.questions[${index}].subQuestions`
                : `${childOfString}.subQuestions[${index}]`
            ),
            options:
              question.options && question.options.length
                ? question.options.map((o, opindex) => {
                    if (o && o.subQuestionbool) {
                      return {
                        ...o,
                        subQuestions: getUpdatedData(
                          o.subQuestions,
                          (pageNumberStart ? pageNumberStart + "." : "") +
                            (index + 1),
                          childOfString === `currentHeaderQuestion`
                            ? `${childOfString}.questions[${index}].options[${opindex}]`
                            : `${childOfString}.subQuestions[${index}].options[${opindex}]`
                        ),
                      };
                    } else {
                      return o;
                    }
                  })
                : [],
            questionNumber:
              (pageNumberStart ? pageNumberStart + "." : "") + (index + 1),
            currentQuestionArrayLength: questionsArray.length,
            childOfString,
          };
          return item;
        }

        const item = {
          ...question,
          questionNumber:
            (pageNumberStart ? pageNumberStart + "." : "") + (index + 1),
          currentQuestionArrayLength: questionsArray.length,
          childOfString: `${childOfString}[${index}]`,
        };
        return item;
      });
      return updated;
    } else {
      return [];
    }
  };

  const initHeaderQuestionArray = questionsList
    ? questionsList.Headers.map((header, index) => {
        return {
          ...header,
          index,
          questions: getUpdatedData(
            header.questions,
            index + 1,
            `headerQuestionArray.currentHeaderQuestion[${index}]`
          ),
        };
      })
    : null;
  const initCurrentHeaderQuestion =
    initHeaderQuestionArray && initHeaderQuestionArray.length
      ? initHeaderQuestionArray[0]
      : [];
  const initQuestionsArray = getUpdatedData(
    initCurrentHeaderQuestion.questions,
    initCurrentHeaderQuestion.index + 1,
    `currentHeaderQuestion`
  );

  const initLocalState = localStorage.getItem("localState")
    ? JSON.parse(localStorage.getItem("localState"))
    : null;
  const [localState, setLocalState] = React.useState(
    initLocalState
      ? initLocalState
      : {
          headerQuestionArray: initHeaderQuestionArray,
          answerArray: [],
          page: {
            // landing: true,
            getStarted: true,
            questionPage: false,
            headerPage: false,
            preSubmitAnswersPage: false,
            submitAnswersPage: false,
          },
          currentHeaderQuestion: initCurrentHeaderQuestion,
          questionsArray: initQuestionsArray,
          currentQuestion:
            initQuestionsArray &&
            initQuestionsArray.length > 0 &&
            initQuestionsArray[0],
          currentArray: initQuestionsArray,
          currentParentArray: initQuestionsArray,
        }
  );
  const setPage = (data) => {
    localStorage.setItem(
      "localState",
      JSON.stringify({ ...localState, page: data })
    );
    setLocalState({ ...localState, page: data });
  };

  const setDataLocalState = (data) => {
    localStorage.setItem("localState", JSON.stringify(data));
    setLocalState(data);
  };

  const { page, questionsArray, currentQuestion } = localState;
  const questionObject = currentQuestion ? currentQuestion : questionsArray[0];
  return (
    <div
      className={[
        "background",
        /* page.headerPage || */ page.landing || page.getStarted
          ? "removePadding"
          : page.headerPage || page.questionPage
          ? "container-bg"
          : "",
      ].join(" ")}
    >
      <main
        className={[
          "maincontent",
          page.headerPage ||
          page.getStarted ||
          !(
            page &&
            !(page.getStarted || page.landing || page.headerPage) &&
            questionObject &&
            questionObject.options &&
            questionObject.questionType !== "HIDDEN" &&
            questionObject.options.length >= 5
          )
            ? `alignCenter ${
                page.landing || page.submitAnswersPage ? "removeTopPadding" : ""
              }`
            : "",
        ].join(" ")}
      >
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="Logout"
          placement="left"
        >
          <IconButton
            className="logout"
            style={{
              float: "right",
              marginRight: "10px",
              marginTop: "5px",
              position: "absolute",
              top: "0",
              right: "0",
            }}
            color="inherit"
            edge="end"
            onClick={LogOut}
          >
            <ExitToApp />
          </IconButton>
        </Tooltip>
        <>
          {loading || !questionsList ? (
            <Loader />
          ) : (
            <>
              <QuestionsList
                {...{
                  history,
                  questionsList,
                  handleProgressCount,
                  progress,
                  getUpdatedData,
                  localState,
                  setIsLoggedIn,
                  setPage,
                }}
                setLocalState={setDataLocalState}
              />
            </>
          )}
        </>
      </main>
    </div>
  );
};

export default Questions;
