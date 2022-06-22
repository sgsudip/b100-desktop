import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionTitle from "./QuestionTitle";
import QuestionOptions from "./Options";
import QuestionSubmitButton from "./SubmitButton";
import QuestionBackButton from "./BackButton";

const Question = (props) => {
  const {
    history,
    getStartedTitle,
    subTitle,
    landingTitle,
    submitAnswerTitle,
    submitAnswerSubTitle,
    nextActionText,
    onNextButtonClick,
    optionsArray = [],
    handleProgressCount,
    setLocalState,
    localState,
    questionObject,
    handleChange,
    localQuestionState,
    setLocalQuestionDataState,
    show,
    handleBackButtonClick,
  } = props;
  const {
    page,
    currentHeaderQuestion,
    questionsArray,
    currentQuestion,
    currentArray,
    currentParentArray,
    headerQuestionArray,
  } = localState;
  let { loading } = useSelector(({ commonData }) => commonData);
  let { authUser } = useSelector(
    ({ authenticationData }) => authenticationData
  );

  const [heightValid, setHeightValid] = useState(false);

  const setLocalQuestionState = (data) => {
    localStorage.setItem("localQuestionState", JSON.stringify(data));
    setLocalQuestionDataState(data);
  };
  const setAnswer = (answer, textInput) => {
    setLocalQuestionState({
      ...localQuestionState,
      answer: answer,
      inputValue: textInput
        ? textInput
        : typeof answer === "string"
        ? answer
        : "",
      inputError: "",
      isDisabled: false,
    });
  };
  const { inputValue } = localQuestionState;
  const setInputError = (data, textInput) => {
    setLocalQuestionState({
      ...localQuestionState,
      inputError: data,
      inputValue: textInput ? textInput : "",
      isDisabled: true,
      answer: null,
    });
  };

  const [options, setOptions] = React.useState(optionsArray);
  useEffect(() => {
    if (optionsArray && optionsArray.length) {
      if (
        questionObject &&
        questionObject.questionType === "MULTI-CHOICE" &&
        !(
          questionObject &&
          questionObject.questionType &&
          (questionObject.questionType === "HIDDEN" ||
            questionObject.questionType === "FILL-IN") &&
          !questionObject.subQuestions.length
        )
      ) {
        const answered = localState.answerArray.find(
          (a) => a._id === questionObject._id
        );
        if (answered) {
          if (answered.answer) {
            const selectedAnswers = answered.answer.map((ans) => ans.choice);
            const finalOptions = optionsArray.map((o) => {
              if (selectedAnswers.includes(o._id)) {
                return { ...o, selected: true };
              }
              return o;
            });
            setOptions(finalOptions);
          }
        } else {
          setOptions(optionsArray);
        }
      } else {
        setOptions(optionsArray);
      }
    }
  }, [optionsArray, localState.answerArray, questionObject]);

  const handleNextButtonClick = (currentAnswer) => {
    let answerData = currentAnswer;
    handleChange();
    setTimeout(() => {
      const userId = authUser
        ? authUser._id
        : JSON.parse(localStorage.getItem("auth_user"))._id;
      let currentQuestionAnswer = null,
        updatedAnswerArray = [...localState.answerArray];
      if (questionObject && questionObject.questionType) {
        switch (currentQuestion.questionType) {
          case "MULTI-CHOICE":
            if (answerData) {
              currentQuestionAnswer = answerData.map((ans) => {
                return {
                  user: userId,
                  choice: ans._id,
                  question: currentQuestion._id,
                  answer: ans.option_choice_name,
                  questionText: questionObject.question,
                };
              });
            }
            break;
          case "SINGLE-CHOICE":
            if (answerData) {
              currentQuestionAnswer = [
                {
                  user: userId,
                  choice: answerData._id,
                  question: currentQuestion._id,
                  answer: answerData.option_choice_name,
                  questionText: questionObject.question,
                },
              ];
            }
            break;
          case "FILL-IN":
            if (answerData) {
              currentQuestionAnswer = [
                {
                  user: userId,
                  isFillIn: true,
                  choice: answerData,
                  question: currentQuestion._id,
                  answer: answerData,
                  questionText: questionObject.question,
                },
              ];
            }
            break;
          case "HIDDEN":
            if (answerData) {
              if (
                questionObject.question.includes("days a week ", " alcohol") ||
                questionObject.question.includes(
                  "how many drinks",
                  "one sitting"
                )
              ) {
                let answer = "";
                for (let i = 0; i < questionObject.options.length; i++) {
                  // const element = array[i];
                  const option = questionObject.options[i];
                  if (
                    answerData >= option.minValue &&
                    answerData <= option.maxValue
                  ) {
                    answer = option._id;
                  }
                }
                currentQuestionAnswer = [
                  {
                    user: userId,
                    choice: answer,
                    question: currentQuestion._id,
                    answer: answerData,
                    questionText: questionObject.question,
                  },
                ];
              } else {
                currentQuestionAnswer = [
                  {
                    user: userId,
                    isFillIn: true,
                    choice: answerData,
                    question: currentQuestion._id,
                    answer: answerData,
                    questionText: questionObject.question,
                  },
                ];
              }
            }
            break;
          case "YES-NO":
            if (answerData) {
              currentQuestionAnswer = [
                {
                  user: userId,
                  choice: answerData._id,
                  question: currentQuestion._id,
                  answer: answerData.option_choice_name,
                  questionText: questionObject.question,
                },
              ];
            }
            break;
          default:
            break;
        }
        const isCurrentAnswerSubmited = [...localState.answerArray].findIndex(
          (i) => i._id === questionObject._id
        );
        if (isCurrentAnswerSubmited >= 0 && currentQuestionAnswer) {
          const currentlyAnsweredArray = [...localState.answerArray];
          currentlyAnsweredArray[isCurrentAnswerSubmited] = {
            ...questionObject,
            answer: currentQuestionAnswer,
          };
          updatedAnswerArray = currentlyAnsweredArray;
        } else if (currentQuestionAnswer) {
          updatedAnswerArray = [
            ...localState.answerArray,
            { ...questionObject, answer: currentQuestionAnswer },
          ];
        } else if (!currentQuestionAnswer && isCurrentAnswerSubmited >= 0) {
          updatedAnswerArray = [...localState.answerArray].filter(
            (i) => i._id !== questionObject._id
          );
        }
      }

      if (answerData && Array.isArray(answerData) === false) {
        if (answerData.subQuestionbool) {
          setLocalState({
            ...localState,
            currentParentArray: currentArray,
            currentArray: answerData.subQuestions,
            currentQuestion: answerData.subQuestions[0],
            answerArray: updatedAnswerArray,
          });
          handleChange();
          return;
        }
      } else if (answerData && Array.isArray(answerData) === true) {
        if (answerData.find((i) => i.subQuestionbool)) {
          const answerArrayData = answerData.find((i) => i.subQuestionbool);
          setLocalState({
            ...localState,
            currentParentArray: currentArray,
            currentArray: answerArrayData.subQuestions,
            currentQuestion: answerArrayData.subQuestions[0],
            answerArray: updatedAnswerArray,
          });
          handleChange();
          return;
        }
      }
      // sub questions and Next question conditions
      if (questionObject && questionObject.subQuestionbool) {
        setLocalState({
          ...localState,
          currentParentArray: currentArray,
          currentArray: questionObject.subQuestions,
          currentQuestion: questionObject.subQuestions[0],
          answerArray: updatedAnswerArray,
        });
      } else if (questionObject && questionObject.questionNumber) {
        const indexArray = questionObject.questionNumber.split(".");
        if (
          indexArray &&
          indexArray.length > 2 &&
          Number(indexArray[indexArray.length - 1]) <
            questionObject.currentQuestionArrayLength
        ) {
          setLocalState({
            ...localState,
            currentQuestion:
              currentArray[Number(indexArray[indexArray.length - 1])],
            answerArray: updatedAnswerArray,
          });
        } else if (indexArray && indexArray.length === 2) {
          if (
            questionsArray &&
            indexArray &&
            Number(indexArray[1]) ===
              questionsArray[0].currentQuestionArrayLength
          ) {
            if (headerQuestionArray[currentHeaderQuestion.index + 1]) {
              setLocalState({
                ...localState,
                currentHeaderQuestion:
                  headerQuestionArray[currentHeaderQuestion.index + 1],
                page: { ...page, questionPage: false, headerPage: true },
                answerArray: updatedAnswerArray,
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
                answerArray: updatedAnswerArray,
              });
            }
          } else {
            setLocalState({
              ...localState,
              currentParentArray: questionsArray,
              currentArray: questionsArray,
              currentQuestion: questionsArray[Number(indexArray[1])],
              answerArray: updatedAnswerArray,
            });
          }
          handleProgressCount();
        } else if (
          indexArray &&
          indexArray.length > 2 &&
          !(
            Number(indexArray[indexArray.length - 1]) <
            questionObject.currentQuestionArrayLength
          )
        ) {
          if (
            Number(indexArray[indexArray.length - 2]) ===
            currentParentArray[Number(indexArray[indexArray.length - 2]) - 1]
              .currentQuestionArrayLength
          ) {
            if (
              questionsArray[Number(indexArray[indexArray.length - 2]) - 1]
                .currentQuestionArrayLength ===
                currentParentArray[
                  Number(indexArray[indexArray.length - 2]) - 1
                ].currentQuestionArrayLength &&
              headerQuestionArray[currentHeaderQuestion.index + 1]
            ) {
              setLocalState({
                ...localState,
                currentHeaderQuestion:
                  headerQuestionArray[currentHeaderQuestion.index + 1],
                page: { ...page, headerPage: true },
                answerArray: updatedAnswerArray,
              });
            } else if (
              questionsArray[Number(indexArray[indexArray.length - 2]) - 1]
                .currentQuestionArrayLength !==
              currentParentArray[Number(indexArray[indexArray.length - 2]) - 1]
                .currentQuestionArrayLength
            ) {
              if (
                questionsArray &&
                indexArray &&
                Number(indexArray[1]) ===
                  questionsArray[0].currentQuestionArrayLength
              ) {
                if (headerQuestionArray[currentHeaderQuestion.index + 1]) {
                  setLocalState({
                    ...localState,
                    currentHeaderQuestion:
                      headerQuestionArray[currentHeaderQuestion.index + 1],
                    page: { ...page, questionPage: false, headerPage: true },
                    answerArray: answerData
                      ? updatedAnswerArray
                      : localState.answerArray,
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
                    answerArray: answerData
                      ? updatedAnswerArray
                      : localState.answerArray,
                  });
                }
              } else {
                setLocalState({
                  ...localState,
                  currentParentArray: questionsArray,
                  currentArray: questionsArray,
                  currentQuestion: questionsArray[Number(indexArray[1])],
                  answerArray: answerData
                    ? updatedAnswerArray
                    : localState.answerArray,
                });
              }
              handleProgressCount();
            } else {
              setLocalState({
                ...localState,
                page: {
                  ...page,
                  questionPage: false,
                  headerPage: false,
                  preSubmitAnswersPage: true,
                },
                answerArray: updatedAnswerArray,
              });
            }
          } else {
            setLocalState({
              ...localState,
              currentParentArray: questionsArray,
              currentArray: currentParentArray,
              currentQuestion:
                currentParentArray[Number(indexArray[indexArray.length - 2])],
              answerArray: answerData
                ? updatedAnswerArray
                : localState.answerArray,
            });
          }
          handleProgressCount();
        }
      }
      // if (answerData && Array.isArray(answerData) === false) {
      // if (questionObject.question.includes("days a week ", " alcohol")) {
      //   if (answerData <= parseInt("1")) {
      //     setLocalState({
      //       ...localState,
      //       currentHeaderQuestion:
      //         headerQuestionArray[currentHeaderQuestion.index + 1],
      //       page: { ...page, questionPage: false, headerPage: true },
      //       answerArray: updatedAnswerArray,
      //     });
      //   }
      // }
      // }

      if (onNextButtonClick) {
        onNextButtonClick();
      }

      // if (!heightValid) {
      //   debugger;
      //   setLocalQuestionState({
      //     answer: null,
      //     inputValue: "",
      //     inputError: "",
      //     isDisabled: false,
      //   });
      // }
      // setHeightValid(false);
      answerData = undefined;
      handleChange();
    }, 400);
  };

  return (
    <>
      {!loading && (
        <>
          <div
            className={[
              page.getStarted || page.landing || page.headerPage
                ? "addmarginTop"
                : page.questionPage && questionObject.hasImages
                ? "image-margin"
                : "",
              "contentArea transitionDiv",
              page &&
              !(page.getStarted || page.landing || page.headerPage) &&
              questionObject &&
              // questionObject.questionType === "MULTI-CHOICE" &&
              questionObject &&
              questionObject.options &&
              questionObject.questionType !== "HIDDEN" &&
              questionObject.options.length > 5
                ? "multiChoiceContent"
                : "",
            ].join(" ")}
            style={
              page.landing
                ? {
                    textAlign: "center !important",
                  }
                : {}
            }
          >
            <QuestionTitle
              {...{
                getStartedTitle,
                subTitle,
                landingTitle,
                submitAnswerTitle,
                submitAnswerSubTitle,
                nextActionText,
                localState,
              }}
            />
            <QuestionOptions
              {...{
                nextActionText,
                handleNextButtonClick,
                questionObject,
                options,
                setOptions,
                localQuestionState,
                setLocalQuestionState,
                currentQuestion,
                setInputError,
                setAnswer,
                inputValue,
                localState,
                setHeightValid,
              }}
            />
            <div className="questionButton">
              <QuestionBackButton {...{ page, show, handleBackButtonClick }} />
              <QuestionSubmitButton
                {...{
                  history,
                  nextActionText,
                  localState,
                  questionObject,
                  handleNextButtonClick,
                  options,
                  setAnswer,
                  optionsArray,
                  localQuestionState,
                  setLocalQuestionState,
                  setOptions,
                  page,
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Question;
