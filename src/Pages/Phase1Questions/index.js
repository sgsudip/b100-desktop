import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader";
import Phase1Questions from "./Phase1Questions";

import { getQuestionsList } from "../../Redux/Actions/QuestionsList";
const Questions = (props) => {
  const dispatch = useDispatch();
  const { setIsLoggedIn, history, loading } = props;
  const initProgress = Number(localStorage.getItem("progress"));
  const [progress, setProgress] = React.useState(
    initProgress ? initProgress : 0
  );

  let { Phase1QuestionsList } = useSelector(({ PhaseData }) => PhaseData);
  let { authUser } = useSelector(
    ({ authenticationData }) => authenticationData
  );
  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      dispatch(
        getQuestionsList(
          authUser
            ? authUser._id
            : JSON.parse(localStorage.getItem("auth_user"))._id
        )
      );
    }
  }, [setIsLoggedIn, authUser, dispatch]);

  const handleProgressCount = (action) => {
    if (action === "Back") {
      const count =
        progress - 100 / Phase1QuestionsList.TotalCount[0].mainQuestionCount;
      localStorage.setItem("progress", count < 0 ? 0 : count);
      setProgress(count < 0 ? 0 : count);
    } else {
      const count =
        progress + 100 / Phase1QuestionsList.TotalCount[0].mainQuestionCount;
      localStorage.setItem("progress", count > 100 ? 100 : count);
      setProgress(count > 100 ? 100 : count);
    }
  };
  const LogOut = () => {
    setIsLoggedIn(false);
    history.push("/");
    localStorage.clear();
  };
  const initLocalState = localStorage.getItem("localState")
    ? JSON.parse(localStorage.getItem("localState"))
    : null;
  return (
    <>
      {!initLocalState && (loading || !Phase1QuestionsList) ? (
        <div className={"background"}>
          <Loader />
        </div>
      ) : (
        <>
          <Phase1Questions
            questionsList={Phase1QuestionsList}
            {...{
              handleProgressCount,
              progress,
              LogOut,
              history,
              setIsLoggedIn,
              loading,
            }}
          />
        </>
      )}
    </>
  );
};

export default Questions;
