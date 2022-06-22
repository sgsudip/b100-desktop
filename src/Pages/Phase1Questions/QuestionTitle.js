import React from "react";
import logoImage from "../../Assets/Images/logo-b100.png";
// import submitFormImage from "../../Assets/Images/submit_page.png";
// import heartImage from "../../Assets/Images/heart.png";

const QuestionsTitle = (props) => {
  const {
    getStartedTitle,
    subTitle,
    landingTitle,
    submitAnswerTitle,
    submitAnswerSubTitle,
    nextActionText,
    localState,
  } = props;
  const { page, currentHeaderQuestion, currentQuestion } = localState;
  const questionNumber = currentQuestion.questionNumber;
  const questionDescriptionText = currentQuestion.questionSubText;
  const questionText = currentQuestion.question;
  return (
    <>
      <div
        style={{
          width: "100%",
        }}
      >
        {landingTitle && (
          <figure>
            <div className="landingLogoContainer">
              <img
                alt="logo"
                style={{ maxWidth: "900px !important" }}
                src={logoImage}
              />
            </div>
          </figure>
        )}
        {/* {!page.headerPage && getStartedTitle && !page.preSubmitAnswersPage && (
          <figure>
            <img alt="logo" className="heart-img" src={heartImage} />
          </figure>
        )} */}
        {/* {nextActionText === "SUBMIT" && (
          <figure>
            <div className="landingLogoContainer" style={{ textAlign: "left" }}>
              <img
                alt="logo"
                style={{ maxWidth: "900px !important" }}
                src={submitFormImage}
              />
            </div>
          </figure>
        )} */}

        {page &&
        (page.headerPage || page.questionPage) &&
        (questionNumber || currentHeaderQuestion.index + 1) ? (
          <p
            style={{ fontSize: "16px", opacity: "0.7" }}
            className="questionDescriptionText"
          >
            {/* Question{" "} */}
            Section{" "}
            {page.headerPage ? currentHeaderQuestion.index + 1 : questionNumber}
          </p>
        ) : null}
        <div
          className={
            getStartedTitle
              ? !page.preSubmitAnswersPage
                ? "headingText"
                : "precustomclass"
              : page.landing
              ? "landingHeaderText"
              : "questionText"
          }
          style={
            submitAnswerTitle
              ? {
                  fontSize: "42px",
                }
              : {}
          }
        >
          <span>
            {submitAnswerTitle
              ? submitAnswerTitle
              : getStartedTitle
              ? getStartedTitle
              : landingTitle
              ? "Developed and founded by one of the world's leading cardiologists in preventative and functional cardiovascular diseases."
              : questionText
              ? questionText
              : ""}
          </span>
          {/* <span className="d-block my-3">
          This is your first step to accurately knowing the status of your  
              <span className="primary-color"> heart health.</span>
          </span> */}
          {/* <span className="get-startedlabel">
            Let’s get started
          </span> */}
          {(getStartedTitle ||
            landingTitle ||
            questionDescriptionText ||
            nextActionText === "SUBMIT") && (
            <p className="questionDescriptionText">
              {questionDescriptionText && !getStartedTitle && !landingTitle
                ? questionDescriptionText
                : getStartedTitle
                ? subTitle
                : landingTitle
                ? "Dr. Arash Bereliani a.k.a Dr. B The Heart Doctor"
                : submitAnswerSubTitle
                ? submitAnswerSubTitle
                : ""}
            </p>
          )}
          {getStartedTitle && !page.headerPage && !page.questionPage ? (
            <p className="disclaimerText">
              This quiz will take approximately 15 minutes to complete. If you
              are unable to finish your responses will be automatically saved.
            </p>
          ) : null}
          {currentQuestion &&
          currentQuestion.questionType === "MULTI-CHOICE" &&
          !(
            currentQuestion.questionSubText
              .toLowerCase()
              .includes("select all") ||
            currentQuestion.questionSubText
              .toLowerCase()
              .includes("more than one")
          ) &&
          !landingTitle &&
          !getStartedTitle ? (
            <p className="questionDescriptionText subtext">
              Select all that apply
            </p>
          ) : null}
          {currentQuestion &&
          currentQuestion.questionType === "SINGLE-CHOICE" &&
          !landingTitle &&
          !getStartedTitle &&
          !currentQuestion.questionSubText &&
          !currentQuestion.question.toLowerCase().includes("love field") ? (
            <p className="questionDescriptionText subtext">
              Select the best option
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default QuestionsTitle;
