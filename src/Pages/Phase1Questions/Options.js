import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  // FilledInput,
  Card,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { useSelector } from "react-redux";
import CustomModal from "../../Components/CustomModal";
import { Info } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  black: {
    color: "white",
    backgroundColor: "black",
    width: "30px",
    height: "30px",
    fontSize: "15px !important",
  },
  optionButton: {
    marginRight: "15px",
  },
  textField: {
    marginTop: "20px",
    width: "280px",
  },
  root: {
    height: 200,
    width: "100%",
    marginBottom: "20px",
    marginRight: "15px",
    position: "relative",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  tooltip: {
    fontSize: "15px",
    padding: "10px",
    paddingRight: "3px",
    textAlign: "center",
  },
}));
const QuestionOptions = (props) => {
  const {
    nextActionText,
    handleNextButtonClick,
    questionObject,
    options,
    localQuestionState,
    currentQuestion,
    setInputError,
    setAnswer,
    setOptions,
    inputValue,
    localState,
    setHeightValid,
  } = props;
  const questionText = currentQuestion.question;
  const classes = useStyles();
  const { inputError } = localQuestionState;
  const { page, answerArray } = localState;

  const NOTA = [
    "none of the above",
    "i prefer not to answer",
    "no, i have not",
  ];

  /* let { authUser } = useSelector(
    ({ authenticationData }) => authenticationData
  ); */

  const [openDisclaimer, setOpenDisclaimer] = useState(false);
  const [heightAnswer, setHeightAnswer] = useState({
    feet: "",
    inches: "",
    feetError: "",
    inchesError: "",
  });
  const [finalOptions, setFinalOptions] = useState(options);
  const [count, setCount] = useState(false);

  useEffect(() => {
    if (currentQuestion.questionType === "HIDDEN") {
      const newAnswerArray = answerArray.filter(
        (e) => currentQuestion._id === e._id
      );
      if (newAnswerArray && newAnswerArray.length) {
        setAnswer(newAnswerArray[0].answer[0].answer);
        if (
          currentQuestion &&
          currentQuestion.question.toLowerCase().includes("tall", "height")
        ) {
          const feetAnswer = Math.floor(
            newAnswerArray[0].answer[0].answer / 12
          );
          const inchesAnswer = newAnswerArray[0].answer[0].answer % 12;
          setHeightAnswer({
            feet: feetAnswer,
            inches: inchesAnswer,
            feetError: "",
            inchesError: "",
          });
          setHeightValid(true);
        }
      }
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (
      currentQuestion &&
      currentQuestion.question.length &&
      currentQuestion.question
        .toLowerCase()
        .includes("have you used any of the following drugs over the last year")
    ) {
      setOpenDisclaimer(
        currentQuestion.question
          .toLowerCase()
          .includes(
            "have you used any of the following drugs over the last year"
          )
      );
    }
    if (!(page.questionPage && questionText.includes("how tall are you?"))) {
      setHeightAnswer({
        feet: "",
        inches: "",
        feetError: "",
        inchesError: "",
      });
    }
  }, [
    currentQuestion,
    currentQuestion.question,
    setHeightAnswer,
    questionText,
    page,
  ]);

  useEffect(() => {
    if (
      currentQuestion &&
      currentQuestion.question.includes("Regarding your menopause")
    ) {
      let FemaleOption = [];
      let age = getAge(JSON.parse(localStorage.getItem("auth_user")).dob);
      if (age <= 50) {
        if (age <= 47) {
          FemaleOption = options.filter(
            (item) =>
              item.option_choice_name !==
              "I started taking oral estrogen before the age of 47"
          );
          FemaleOption = FemaleOption.filter(
            (item) =>
              item.option_choice_name !==
              "My menopause started when I was 50 or younger"
          );
          // this.setState({ femaleOptions: options });
        } else {
          FemaleOption = options.filter(
            (item) =>
              item.option_choice_name !==
              "My menopause started when I was 50 or younger"
          );
        }
      } else {
        FemaleOption = options;
      }
      setCount(true);
      setFinalOptions(FemaleOption);
    }
  }, [options, currentQuestion]);

  const isFloat = (n) => {
    return (n + "").includes(".") || (!isNaN(Number(n)) && Number(n) % 1 !== 0);
  };

  const handleTextInput = (value) => {
    const textInput = value.trim();
    if (!textInput.length) {
      setInputError("Input is required", textInput);
      return;
    } else {
      if (
        questionText &&
        questionText
          .toLowerCase()
          .includes("how many cigarettes do you smoke a day")
      ) {
        if (textInput.length && !isFloat(textInput)) {
          setAnswer(textInput);
        } else {
          setInputError("Invalid cigarette number", textInput);
        }
      } else if (
        questionText &&
        questionText.toLowerCase().includes("many years have you been smoking")
      ) {
        if (textInput.length && !isFloat(textInput)) {
          setAnswer(textInput);
        } else {
          setInputError("Invalid years", textInput);
        }
      } else if (
        questionText &&
        questionText.toLowerCase().includes("much do you currently weigh?")
      ) {
        if (textInput.length && !isNaN(Number(textInput))) {
          // if (parseInt(textInput) >= 80 && parseInt(textInput) <= 500) {
          if (parseFloat(textInput) >= 80 && parseFloat(textInput) <= 500) {
            if (textInput.includes(".") && textInput.length > 7) {
              setAnswer(parseFloat(textInput).toFixed(3));
            } else {
              setAnswer(textInput);
            }
          } else {
            setInputError("Weight must be between 80 and 500", textInput);
          }
        } else {
          setInputError("Invalid weight", textInput);
        }
      } else if (
        questionText &&
        questionText.toLowerCase().includes("many medications")
      ) {
        if (
          textInput.length &&
          !isFloat(textInput) &&
          Number(textInput) >= 5 &&
          Number(textInput) < 51
        ) {
          setAnswer(textInput);
        } else {
          if (isFloat(textInput) || isNaN(Number(textInput))) {
            setInputError("Invalid medication number", textInput);
          } else {
            setInputError(
              "Medications should be 5 or more and less than 50",
              textInput
            );
          }
        }
      } else if (
        questionText &&
        questionText.toLowerCase().includes("days a week ", " alcohol")
      ) {
        if (parseFloat(textInput) > 7 || parseInt(textInput) <= 0) {
          setInputError("Please Enter between 1 and 7", textInput);
        } else {
          if (!isNaN(Number(textInput))) {
            setAnswer(textInput);
          } else {
            setInputError("Please enter the number", textInput);
          }
        }
      } else if (
        questionText &&
        questionText.toLowerCase().includes("how many drinks", "one sitting")
      ) {
        if (!isNaN(Number(textInput)) && parseInt(textInput) < 16) {
          setAnswer(textInput);
        } else if (parseInt(textInput) > 15) {
          setInputError("Please enter average", textInput);
        } else {
          setInputError("Please enter number", textInput);
        }
      } else {
        setAnswer(textInput);
      }
    }
  };

  const handleHeightTextInputs = (value, inputType) => {
    const textInput = value.trim();
    if (inputType === "feet") {
      if (!textInput.length && !heightAnswer.inches) {
        setInputError("Input is required", textInput);
        setHeightAnswer({
          ...heightAnswer,
          inchesError: "Input is required",
          feetError: true,
          feet: textInput,
        });
        return;
      }
      if (!isNaN(textInput) && !isNaN(Number(heightAnswer.inches))) {
        // if (parseInt(textInput) >= 4 && parseInt(textInput) <= 8) {
        const answerData =
          Number(textInput) * 12 + Number(heightAnswer.inches) + "";
        if (!(parseInt(textInput) >= 4 && parseInt(textInput) <= 8)) {
          setHeightAnswer({
            ...heightAnswer,
            feetError: "Height must be between 4ft and 8ft",
            feet: textInput,
          });
          return;
        } else if (
          answerData >= 48 &&
          answerData <= 96 &&
          !isNaN(Number(textInput))
        ) {
          setAnswer(answerData);
          setHeightAnswer({ ...heightAnswer, feetError: "", feet: textInput });
        } else {
          setHeightAnswer({
            ...heightAnswer,
            feetError: "Invalid height values.",
            feet: textInput,
          });
          return;
        }
      } else if (
        textInput.length &&
        !isFloat(textInput) &&
        !isNaN(Number(textInput))
      ) {
        const answerData = Number(textInput) * 12 + "";

        setAnswer(answerData);
        setHeightAnswer({ ...heightAnswer, feetError: "", feet: textInput });
      } else {
        setInputError("Invalid feet and inches");
        setHeightAnswer({
          ...heightAnswer,
          feetError: "Invalid Feet",
          feet: textInput,
        });
      }
    } else if (inputType === "inches") {
      if (!textInput.length && !heightAnswer.feet) {
        setInputError("Input is required", textInput);
        setHeightAnswer({
          ...heightAnswer,
          inchesError: "Input is required",
          feetError: true,
          inches: textInput,
        });
        return;
      }
      if (
        !isNaN(textInput) &&
        !isNaN(Number(heightAnswer.feet) && Number(heightAnswer.feet) >= 0)
      ) {
        // if (parseInt(textInput) < 12 && parseInt(textInput) >= 0) {
        const answerData =
          Number(heightAnswer.feet) * 12 + Number(textInput) + "";
        if (!(parseInt(textInput) < 12 && parseInt(textInput) >= 0)) {
          setHeightAnswer({
            ...heightAnswer,
            inchesError: "Invalid inches value. it is always between 0 and 11",
            inches: textInput,
          });
          return;
        } else if (
          answerData >= 48 &&
          answerData <= 96 &&
          !isNaN(Number(textInput))
        ) {
          setAnswer(answerData);
          setHeightAnswer({
            ...heightAnswer,
            inchesError: "",
            inches: textInput,
          });
        } else {
          setHeightAnswer({
            ...heightAnswer,
            inchesError: "Invalid height values.",
            inches: textInput,
          });
          return;
        }
      } else if (
        textInput.length &&
        !isFloat(textInput) &&
        !isNaN(Number(textInput))
      ) {
        const answerData = Number(textInput) + "";

        setAnswer(answerData);
        setHeightAnswer({
          ...heightAnswer,
          inchesError: "",
          inches: textInput,
        });
      } else {
        setInputError("Invalid feet and inches");
        setHeightAnswer({
          ...heightAnswer,
          inchesError: "Invalid inches",
          inches: textInput,
        });
      }
    }
  };

  const handleSelectAnswer = (selectedOption, question) => {
    if (
      ((question.question
        .toLowerCase()
        .includes(
          "have you followed any of these diet trends in the last year"
        ) &&
        selectedOption.option_choice_name.toLowerCase() === "atkins") ||
        (question.question
          .toLowerCase()
          .includes("do you exercise on a weekly basis?") &&
          selectedOption.option_choice_name.toLowerCase() === "no") ||
        (question.question
          .toLowerCase()
          .includes("best describes your relationship with cigarettes") &&
          selectedOption.option_choice_name
            .toLowerCase()
            .includes("have never entered a relationship")) ||
        question.question
          .toLowerCase()
          .includes("is heart disease preventable?")) &&
      !selectedOption.selected
    ) {
      setOpenDisclaimer(true);
    }
    if (
      question.question
        .toLowerCase()
        .includes(
          "let us have some fun, pick five words from the list below that best describe your personality."
        ) &&
      !selectedOption.selected
    ) {
      const selected = [...options].filter((o) => o.selected);
      if (selected && selected.length === 5) {
        setOpenDisclaimer(true);
        return;
      }
    }
    if (question.questionType === "MULTI-CHOICE") {
      const copied = [...options];

      const selectedOptionName = NOTA.filter((item) =>
        selectedOption.option_choice_name.toLowerCase().includes(item)
      );
      let updatedOptions;
      if (selectedOptionName && selectedOptionName.length) {
        updatedOptions = copied.map((option) => {
          if (
            !option.option_choice_name
              .toLowerCase()
              .includes(selectedOptionName[0])
          )
            return { ...option, selected: false };
          else return { ...option, selected: !option.selected };
        });
      } else {
        updatedOptions = copied.map((option) => {
          if (
            option.option_choice_name.toLowerCase().includes(NOTA[0]) ||
            option.option_choice_name.toLowerCase().includes(NOTA[1]) ||
            option.option_choice_name.toLowerCase().includes(NOTA[2])
          )
            return { ...option, selected: false };
          else if (selectedOption._id === option._id)
            return { ...option, selected: !option.selected };
          else return { ...option };
        });
      }
      // const updatedOptions = copied.map((option) => {
      //   if (
      //     selectedOption.option_choice_name
      //       .toLowerCase()
      //       .includes("none of the above")
      //   ) {
      //     if (option.selected) return { ...option, selected: !option.selected };
      //     else {
      //       copied.filter(item=>item.option_choice_name.toLowerCase().includes('none of the above'))
      //       /*
      //       const selectedValues = copied.filter(
      //         (item) =>
      //           item.selected &&
      //           !item.option_choice_name
      //             .toLowerCase()
      //             .includes("none of the above")
      //       );
      //       selectedValues &&
      //         selectedValues.length &&
      //         selectedValues.map((item) => {
      //           return { ...item, selected: false };
      //         });
      //      */
      //     }
      //   }
      //   if (option._id === selectedOption._id) {
      //     return { ...option, selected: !option.selected };
      //   } else {
      //     return { ...option };
      //   }
      // });
      setAnswer(updatedOptions.filter((o) => o.selected));
      setOptions(updatedOptions);
    } else {
      setAnswer(selectedOption);
      const copied = [...options];
      const updatedOptions = copied.map((option) => {
        if (option._id === selectedOption._id) {
          return { ...option, selected: true };
        } else {
          return { ...option, selected: false };
        }
      });
      // setAnswer(updatedOptions.filter(o=>o.selected));
      setOptions(updatedOptions);
    }
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  let finalOption = options;
  // if (currentQuestion && currentQuestion.question.includes("Regarding your menopause") /* && count */) {
  //   // setCount(false);
  //   // let finalOption = options;
  //   const age50customOption = options.filter(o => o.option_choice_name.toLowerCase().includes("i was 50"))
  //   const age47customOption = options.filter(o => o.option_choice_name.toLowerCase().includes("the age of 47"))
  //   if (!(authUser ? getAge(authUser.dob) : getAge(JSON.parse(localStorage.getItem("auth_user")).dob) > 50 && age50customOption)) {
  //     finalOption = finalOption.filter(o => o._id !== age50customOption[0]._id)
  //   }
  //   if (!(authUser ? getAge(authUser.dob) : getAge(JSON.parse(localStorage.getItem("auth_user")).dob) > 47 && age47customOption)) {
  //     finalOption = finalOption.filter(o => o._id !== age47customOption[0]._id)
  //   }
  //   // setFinalOptions(finalOption)
  // }

  const handleModalClose = () => {
    setOpenDisclaimer(false);
    let answerData = null;

    if (
      currentQuestion.question
        .toLowerCase()
        .includes(
          "have you followed any of these diet trends in the last year"
        ) &&
      finalOption.findIndex(
        (o) => o.selected && o.option_choice_name.toLowerCase() === "atkins"
      ) >= 0
    ) {
      answerData =
        finalOption[
          finalOption.findIndex(
            (o) => o.selected && o.option_choice_name.toLowerCase() === "atkins"
          )
        ];
      return;
    }
    if (
      currentQuestion.question
        .toLowerCase()
        .includes("best describes your relationship with cigarettes") &&
      finalOption &&
      finalOption.findIndex(
        (o) =>
          o.selected &&
          o.option_choice_name
            .toLowerCase()
            .includes("have never entered a relationship")
      ) >= 0
    ) {
      answerData =
        finalOption[
          finalOption.findIndex(
            (o) =>
              o.selected &&
              o.option_choice_name
                .toLowerCase()
                .includes("have never entered a relationship")
          )
        ];
    }
    if (
      currentQuestion.question
        .toLowerCase()
        .includes("do you exercise on a weekly basis?") &&
      finalOption &&
      finalOption.findIndex(
        (o) => o.selected && o.option_choice_name.toLowerCase() === "no"
      ) >= 0
    ) {
      answerData =
        finalOption[
          finalOption.findIndex(
            (o) => o.selected && o.option_choice_name.toLowerCase() === "no"
          )
        ];
    }
    if (
      currentQuestion.question
        .toLowerCase()
        .includes(
          "have you used any of the following drugs over the last year"
        ) ||
      currentQuestion.question
        .toLowerCase()
        .includes(
          "let us have some fun, pick five words from the list below that best describe your personality."
        )
    ) {
      return;
    }
    setTimeout(() => {
      handleNextButtonClick(answerData);
      answerData = null;

      setAnswer(null);
      setOptions([]);
    }, 500);
  };

  const toolTipOptions = (option, index) => {
    let heritageOptions = [];
    if (option.option_choice_name.includes("(", ")")) {
      heritageOptions = option.option_choice_name.split("(");
      heritageOptions[1] = heritageOptions[1].split(")")[0];
    } else {
      heritageOptions[0] = option.option_choice_name;
    }
    return (
      <Button
        variant={"contained"}
        style={{
          borderColor: "transparent",
          // backgroundColor: option.selected ? "rgba(255, 76, 110, 1)" : "",
          // color: option.selected ? "white" : "black",
          color: "black",
          // marginBottom: "10px",
          width: "100%",
          marginRight: "0px",
          alignItems: "center",
        }}
        classes={{
          label: "justify-content-between py-1",
          root: "col-3 m-1",
        }}
        // disabled={
        //   !nextActionText
        //     ? options.find((o) => o.selected)
        //       ? true
        //       : false
        //     : false
        // }
        className={[
          classes.optionButton,
          "optionButton",
          option.selected ? "active-radio check-radio" : "",
        ].join(" ")}
        onClick={() => {
          if (!nextActionText) {
            handleSelectAnswer(option, questionObject);
            if (
              ((questionObject.question
                .toLowerCase()
                .includes("do you exercise on a weekly basis?") &&
                option.option_choice_name.toLowerCase() === "no") ||
                (questionObject.question
                  .toLowerCase()
                  .includes(
                    "best describes your relationship with cigarettes"
                  ) &&
                  option.option_choice_name
                    .toLowerCase()
                    .includes("have never entered a relationship")) ||
                questionObject.question
                  .toLowerCase()
                  .includes("is heart disease preventable?")) &&
              !option.selected
            ) {
              return;
            }

            setTimeout(() => {
              handleNextButtonClick(option);
              setAnswer(null);
              setOptions([]);
            }, 500);
          } else {
            handleSelectAnswer(option, questionObject);
          }
        }}
      >
        {/* {option.option_choice_name} */}
        {heritageOptions[0]}
        {heritageOptions.length > 1 ? (
          <Tooltip
            title={heritageOptions.length > 1 ? heritageOptions[1] : ""}
            classes={{ tooltip: classes.tooltip }}
            arrow
          >
            <Info
              className={classes.black}
              style={{
                color: "black",
                backgroundColor: "transparent",
                padding: 0,
                margin: 0,
              }}
            />
          </Tooltip>
        ) : null}
      </Button>
    );
  };

  return (
    <>
      {questionObject &&
      questionObject.questionType &&
      (questionObject.questionType === "HIDDEN" ||
        questionObject.questionType === "FILL-IN") &&
      !questionObject.subQuestions.length &&
      !questionText.includes("how tall are you") &&
      !questionText.includes(
        "The people in our lives have a great impact on our state of mind. It is no coincidence there is a connection between emotions and the beating heart within your chest. So, let us look at how your relationships are affecting your cardiovascular health."
      ) ? (
        <TextField
          type="number"
          focused
          classes={{ root: [classes.textField, "questionTextField"].join(" ") }}
          style={
            questionText &&
            questionText.includes("much do you currently weigh?")
              ? {
                  maxWidth: "280px",
                }
              : {}
          }
          // onChange={(event) => {

          //   handleTextInput(event.target.value);
          // }}
          onChange={(event) => {
            const re = /^[0-9\b]+$/;
            if (event.target.value === "" || re.test(event.target.value)) {
              handleTextInput(event.target.value);
            }
          }}
          InputProps={{
            endAdornment:
              questionText &&
              questionText.includes("much do you currently weigh?") ? (
                <InputAdornment position="start">lbs</InputAdornment>
              ) : null,
          }}
          variant="outlined"
          placeholder={
            questionObject.ageGroup === "Yes"
              ? "Enter Age"
              : questionText &&
                questionText.includes("much do you currently weigh?")
              ? "Enter weight e.g. 1"
              : questionText &&
                questionText.toLowerCase().includes("many medications")
              ? "Enter number of medications"
              : questionText
                  .toLowerCase()
                  .includes("how many cigarettes do you smoke a day")
              ? "Enter number of cigarettes"
              : questionText
                  .toLowerCase()
                  .includes("many years have you been smoking")
              ? "Enter number of years"
              : ""
          }
          error={inputError}
          helperText={inputError}
          value={inputValue}
        />
      ) : page.questionPage && questionText.includes("how tall are you?") ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            type="number"
            focused
            classes={{
              root: [classes.textField, "questionTextField"].join(" "),
            }}
            style={{
              maxWidth: "240px",
              marginBottom: "5px",
            }}
            onChange={(event) => {
              handleHeightTextInputs(event.target.value, "feet");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Feet</InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder={"Enter Feet"}
            error={heightAnswer.feetError}
            helperText={heightAnswer.feetError}
            value={heightAnswer.feet}
          />
          <TextField
            type="number"
            focused
            classes={{
              root: [classes.textField, "questionTextField"].join(" "),
            }}
            onChange={(event) => {
              handleHeightTextInputs(event.target.value, "inches");
            }}
            style={{
              maxWidth: "272px",
              paddingLeft: "15px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Inches</InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder={"Enter Inches"}
            error={heightAnswer.inchesError}
            helperText={heightAnswer.inchesError}
            value={heightAnswer.inches}
          />
        </div>
      ) : null}
      {questionObject &&
      finalOption &&
      questionObject.questionType !== "HIDDEN" &&
      questionObject.questionType !== "FILL-IN" ? (
        <div
          // className="row"
          className={
            finalOption.filter((i) => i.image) &&
            finalOption.filter((i) => i.image).length
              ? "row optionContainer   m-0 "
              : "row optionContainer row m-0 "
          }
          // className="row m-0"
          style={
            questionObject && finalOption.length > 3
              ? {
                  flexDirection:
                    finalOption.filter((i) => i.image) &&
                    finalOption.filter((i) => i.image).length
                      ? "row"
                      : "row",
                }
              : {}
          }
        >
          {currentQuestion &&
          currentQuestion.question.includes("Regarding your menopause") &&
          count
            ? finalOptions.map((option, index) => {
                return (
                  <>
                    {option.image ? (
                      <div className="col-lg-4 col-sm-6 col-md-6 col-12 col-xl-3">
                        <Card
                          className={classes.root}
                          onClick={() => {
                            if (!nextActionText) {
                              handleNextButtonClick(option);
                            } else {
                              handleSelectAnswer(option, questionObject);
                            }
                          }}
                        >
                          {option.selected ? (
                            <>
                              <div
                                class="ss-option-checked--picture"
                                style={{
                                  content: "",
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  borderTop: "50px solid rgb(63, 63, 63)",
                                  borderLeft: "50px solid transparent",
                                }}
                              ></div>
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12.7698 4.20939C13.0684 4.49648 13.0777 4.97127 12.7906 5.26984L6.54055 11.7699C6.39617 11.92 6.19584 12.0034 5.98755 11.9999C5.77927 11.9965 5.5818 11.9066 5.44245 11.7517L3.19248 9.25171C2.91539 8.94383 2.94035 8.46961 3.24823 8.19252C3.55612 7.91543 4.03034 7.94039 4.30743 8.24828L6.01809 10.1491L11.7093 4.23018C11.9964 3.9316 12.4712 3.92229 12.7698 4.20939Z"
                                    fill="#FFFFFF"
                                  ></path>
                                </svg>
                              </div>
                            </>
                          ) : null}
                          <img
                            className={classes.media}
                            src={option.image}
                            alt={option.option_choice_name}
                          />

                          <div
                            style={{
                              position: "relative",
                              bottom: "60px",
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "15px",
                              backgroundColor: option.selected
                                ? "rgba(63, 63, 63, 0.8)"
                                : "",
                              color: option.selected ? "white" : "black",
                            }}
                          >
                            <div
                              style={{
                                borderColor: "rgba(63, 63, 63, 0.5)",
                                color: option.selected ? "white" : "black",
                                marginBottom: "10px",
                              }}
                              // className="fontMuli"
                            >
                              {option.option_choice_name}
                            </div>
                            {/* <Avatar className={classes.black}>
                            {alphabet[index]}
                          </Avatar> */}
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <Button
                        variant={"contained"}
                        style={{
                          borderColor: "transparent",
                          // backgroundColor: option.selected
                          //   ? "rgba(255, 76, 110, 1)"
                          //   : "",
                          // color: option.selected ? "white" : "black",
                          // marginBottom: "10px",
                          color: "black",
                          width: "100%",
                          marginRight: "0px",
                          alignItems: "center",
                        }}
                        classes={{
                          label: "justify-content-between py-1",
                          root: "col-3 m-1",
                        }}
                        // disabled={
                        //   !nextActionText
                        //     ? options.find((o) => o.selected)
                        //       ? true
                        //       : false
                        //     : false
                        // }
                        className={[
                          classes.optionButton,
                          "optionButton",
                          option.selected ? "active-radio check-radio" : "",
                        ].join(" ")}
                        onClick={() => {
                          if (!nextActionText) {
                            handleSelectAnswer(option, questionObject);
                            if (
                              ((questionObject.question
                                .toLowerCase()
                                .includes(
                                  "do you exercise on a weekly basis?"
                                ) &&
                                option.option_choice_name.toLowerCase() ===
                                  "no") ||
                                (questionObject.question
                                  .toLowerCase()
                                  .includes(
                                    "best describes your relationship with cigarettes"
                                  ) &&
                                  option.option_choice_name
                                    .toLowerCase()
                                    .includes(
                                      "have never entered a relationship"
                                    )) ||
                                questionObject.question
                                  .toLowerCase()
                                  .includes("is heart disease preventable?")) &&
                              !option.selected
                            ) {
                              return;
                            }

                            setTimeout(() => {
                              handleNextButtonClick(option);

                              setAnswer(null);
                              setOptions([]);
                            }, 500);
                          } else {
                            handleSelectAnswer(option, questionObject);
                          }
                        }}
                        // endIcon={
                        //   <Avatar className={classes.black}>
                        //     {alphabet[index]}
                        //   </Avatar>
                        // }
                      >
                        {option.option_choice_name}
                      </Button>
                    )}
                  </>
                );
              })
            : finalOption.map((option, index) => {
                return (
                  <>
                    {option.image ? (
                      <div className="col-lg-4 col-sm-6 col-md-6 col-12">
                        <Card
                          className={classes.root}
                          onClick={() => {
                            if (!nextActionText) {
                              handleNextButtonClick(option);
                            } else {
                              handleSelectAnswer(option, questionObject);
                            }
                          }}
                        >
                          {option.selected ? (
                            <>
                              <div
                                class="ss-option-checked--picture"
                                style={{
                                  content: "",
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  borderTop: "50px solid rgb(63, 63, 63)",
                                  borderLeft: "50px solid transparent",
                                }}
                              ></div>
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12.7698 4.20939C13.0684 4.49648 13.0777 4.97127 12.7906 5.26984L6.54055 11.7699C6.39617 11.92 6.19584 12.0034 5.98755 11.9999C5.77927 11.9965 5.5818 11.9066 5.44245 11.7517L3.19248 9.25171C2.91539 8.94383 2.94035 8.46961 3.24823 8.19252C3.55612 7.91543 4.03034 7.94039 4.30743 8.24828L6.01809 10.1491L11.7093 4.23018C11.9964 3.9316 12.4712 3.92229 12.7698 4.20939Z"
                                    fill="#FFFFFF"
                                  ></path>
                                </svg>
                              </div>
                            </>
                          ) : null}
                          <img
                            className={classes.media}
                            src={option.image}
                            alt={option.option_choice_name}
                          />

                          <div
                            style={{
                              position: "relative",
                              bottom: "60px",
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "15px",
                              backgroundColor: option.selected
                                ? "rgba(255, 76, 110, 1)"
                                : "rgb(233, 233, 233)",
                              color: option.selected ? "white" : "black",
                            }}
                          >
                            <div
                              style={{
                                borderColor: "rgba(63, 63, 63, 0.5)",
                                color: option.selected ? "white" : "black",
                                marginBottom: "10px",
                              }}
                              className="fontMuli"
                            >
                              {option.option_choice_name}
                            </div>
                            {/* <Avatar className={classes.black}>
                              {alphabet[index]}
                            </Avatar> */}
                          </div>
                        </Card>
                      </div>
                    ) : currentQuestion &&
                      (currentQuestion.question
                        .toLowerCase()
                        .includes("your family genealogy") ||
                        currentQuestion.question
                          .toLowerCase()
                          .includes("body shape", "identify") ||
                        currentQuestion.question
                          .toLowerCase()
                          .includes("describes your personality") ||
                        currentQuestion.question
                          .toLowerCase()
                          .includes("sleep at night")) ? (
                      toolTipOptions(option, index)
                    ) : (
                      <Button
                        variant={"contained"}
                        style={{
                          borderColor: "transparent",
                          backgroundColor: option.selected
                            ? "rgba(255, 76, 110, 1)"
                            : "",
                          color: option.selected ? "white" : "black",
                          // marginBottom: "10px",
                          width: "100%",
                          marginRight: "0px",
                        }}
                        classes={{
                          label: "justify-content-between py-1",
                          root: "col-3 m-1",
                        }}
                        // disabled={
                        //   !nextActionText
                        //     ? options.find((o) => o.selected)
                        //       ? true
                        //       : false
                        //     : false
                        // }
                        className={[
                          classes.optionButton,
                          "optionButton",
                          questionObject.questionType === "SINGLE-CHOICE"
                            ? "radio-btn"
                            : questionObject.questionType === "YES-NO"
                            ? "symbol-radio"
                            : "",
                          option.selected ? "active-radio" : "",
                        ].join(" ")}
                        onClick={() => {
                          if (!nextActionText) {
                            handleSelectAnswer(option, questionObject);
                            if (
                              ((questionObject.question
                                .toLowerCase()
                                .includes(
                                  "do you exercise on a weekly basis?"
                                ) &&
                                option.option_choice_name.toLowerCase() ===
                                  "no") ||
                                (questionObject.question
                                  .toLowerCase()
                                  .includes(
                                    "best describes your relationship with cigarettes"
                                  ) &&
                                  option.option_choice_name
                                    .toLowerCase()
                                    .includes(
                                      "have never entered a relationship"
                                    )) ||
                                questionObject.question
                                  .toLowerCase()
                                  .includes("is heart disease preventable?")) &&
                              !option.selected
                            ) {
                              return;
                            }

                            setTimeout(() => {
                              handleNextButtonClick(option);

                              setAnswer(null);
                              setOptions([]);
                            }, 500);
                          } else {
                            handleSelectAnswer(option, questionObject);
                          }
                        }}
                        // endIcon={
                        //   <Avatar className={classes.black}>
                        //     {alphabet[index]}
                        //   </Avatar>
                        // }
                      >
                        {option.option_choice_name}
                      </Button>
                    )}
                  </>
                );
              })}
        </div>
      ) : null}
      <CustomModal
        openDeleteAlert={openDisclaimer}
        handleClose={() => {
          // setOpenDisclaimer(false);

          handleModalClose();
        }}
        // dialogTitle={"Alert"}
        dialogContent={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {currentQuestion.question
              .toLowerCase()
              .includes(
                "have you followed any of these diet trends in the last year"
              ) ? (
              <span>
                I was hoping you did not pick Atkins. More to come on your
                report recommendation...
              </span>
            ) : currentQuestion.question
                .toLowerCase()
                .includes("do you exercise on a weekly basis?") ? (
              <span>
                The good news is you always have tomorrow. So, dig up those
                sneakers because even light exercise will help you live a longer
                and healthier life.
              </span>
            ) : currentQuestion.question
                .toLowerCase()
                .includes(
                  "let us have some fun, pick five words from the list below that best describe your personality."
                ) ? (
              <span>You can only pick 5 words !</span>
            ) : currentQuestion.question
                .toLowerCase()
                .includes("is heart disease preventable?") && finalOption ? (
              <span>
                {finalOption.findIndex(
                  (o) =>
                    o.selected &&
                    o.option_choice_name.toLowerCase().includes("false")
                ) >= 0
                  ? "You would think the answer is false since 1 in 3 deaths are from heart disease, BUT the truth is heart disease is the most preventable disease."
                  : "CORRECT!  With 1 in 3 deaths being heart disease related, isn’t it a shame to know that most of these lives could have been saved?"}
              </span>
            ) : currentQuestion.question
                .toLowerCase()
                .includes(
                  "best describes your relationship with cigarettes"
                ) ? (
              <span>
                <br />
                I am so happy to hear that!
                <br />
                <br />
              </span>
            ) : (
              <span>
                I realize answering this question may make you feel
                uncomfortable, however, it is important to answer truthfully as
                most drugs can have adverse cardiovascular effects, ranging from
                abnormal heart rate to heart attacks. Your response will be kept
                in complete confidence per HIPAA guidelines.
              </span>
            )}
            {!currentQuestion.question
              .toLowerCase()
              .includes(
                "let us have some fun, pick five words from the list below that best describe your personality."
              ) &&
              !currentQuestion.question
                .toLowerCase()
                .includes("is heart disease preventable?") &&
              !currentQuestion.question
                .toLowerCase()
                .includes("do you exercise on a weekly basis?") && (
                <span
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  - Dr. B, The Heart Doc
                </span>
              )}
          </div>
        }
        dialogActions={
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                handleModalClose();
              }}
            >
              Ok
            </Button>
          </>
        }
      />
    </>
  );
};

export default QuestionOptions;
