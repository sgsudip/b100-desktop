import { toast } from "react-toastify";
import {
  FETCH_START,
  SET_QUESTIONS_LIST,
  FETCH_SUCCESS,
  SET_PHASE_1_SCORE,
  UPDATE_PHASES,
  AUTH_USER,
  TEST_RESULTS_READY,
  PROFILE,
} from "../ActionTypes";
import * as API from "../../constants/api";
// import { subscribeUser } from "../../subscription";
import addNotification from "react-push-notification";
import logo from "../../Assets/Images/logo.png";

export const getQuestionsList = (userID, history) => async (dispatch) => {
  dispatch({ type: FETCH_START });
  try {
    const response = await API.get(`api/questions_client/id?_id=${userID}`);
    const { data } = response;
    if (data.success) {
      dispatch({
        type: SET_QUESTIONS_LIST,
        payload:
          data.questionsList && data.questionsList[0]
            ? data.questionsList[0]
            : [],
      });
    } else {
      toast.error(data.message);
    }
    dispatch({ type: FETCH_SUCCESS });
  } catch (error) {
    dispatch({ type: FETCH_SUCCESS });
    toast.error(error?.message);
  }
};
export const getScore = (history) => async (dispatch) => {
  dispatch({ type: FETCH_START });
  try {
    const { data } = await API.get("api/user/score");
    if (data.success) {
      // toast.success('Good news! Your B100 grade is ready.');
      // subscribeUser();
      addNotification({
        title: "B100",
        message: "Good news! Your LubDub® grade is ready.",
        onClick: (event) => {
          toast.success("Good news! Your B100 grade is ready.");
          event.preventDefault();
          window.open("https://b100method.com");
        },
        theme: "light",
        duration: 15000,
        native: true, // when using native, your OS will handle theming.
        silent: false,
        icon: logo,
      });
      dispatch({ type: TEST_RESULTS_READY, payload: true });
      dispatch({
        type: SET_PHASE_1_SCORE,
        payload: {
          numericScore: data.numericScore,
          masterScore: data.masterScore,
        },
      });
      // dispatch(fillInfo());
      if (history) {
        history.push("/getstarted");
      }
    } else {
      toast.error(data.message);
    }
    dispatch({ type: FETCH_SUCCESS });
  } catch (error) {
    dispatch({ type: FETCH_SUCCESS });
    toast.error(error?.message);
  }
};

/* export const uploadCustomPhaseOneANS =
  (numMedicationsPerDay, numCigsSmokedPerDay, numYearsSmoked, uid, weight, height) =>
    async (dispatch) => {
      const body = { numYearsSmoked, numCigsSmokedPerDay, numMedicationsPerDay, weight, height };
      const res = await API.put(`api/user/id?_id=${uid}`, body);
    }; */

export const postAnswers =
  (finalAnswerData, authUser, history) => async (dispatch) => {
    dispatch({ type: FETCH_START });
    const optionQuestionsAnswer = finalAnswerData
      .map((i) => i.answer)
      .flat()
      .filter((i) => i && !i.isFillIn);
    const fillInQuestionsAnswer = finalAnswerData
      .map((i) => i.answer)
      .flat()
      .filter((i) => i && i.isFillIn);
    const uid = fillInQuestionsAnswer[0].user;
    var fillInAnswersBody = {
      height: null,
      weight: null,
      numYearsSmoked: null,
      numCigsSmokedPerDay: null,
      numMedicationsPerDay: null,
    };
    for (let i = 0; i < fillInQuestionsAnswer.length; i++) {
      const answer = fillInQuestionsAnswer[i].answer;
      if (
        fillInQuestionsAnswer[i].questionText.toLowerCase().includes("how tall")
      ) {
        fillInAnswersBody.height = answer;
      } else if (
        fillInQuestionsAnswer[i].questionText
          .toLowerCase()
          .includes("currently weigh?")
      ) {
        fillInAnswersBody.weight = answer;
      } else if (
        fillInQuestionsAnswer[i].questionText
          .toLowerCase()
          .includes("years", "smoking")
      ) {
        fillInAnswersBody.numYearsSmoked = answer;
      } else if (
        fillInQuestionsAnswer[i].questionText
          .toLowerCase()
          .includes("how many cigarettes", "day")
      ) {
        fillInAnswersBody.numCigsSmokedPerDay = answer;
      } else if (
        fillInQuestionsAnswer[i].questionText
          .toLowerCase()
          .includes("medications")
      ) {
        fillInAnswersBody.numMedicationsPerDay = answer;
      }
    }
    try {
      await API.put(`api/user/id?_id=${uid}`, fillInAnswersBody);

      // for (let i = 0; i < optionQuestionsAnswer.length; i++) {
      //   await API.post("api/answers", optionQuestionsAnswer[i]);
      // }
      await API.post("api/answers", { answers: optionQuestionsAnswer });
      await API.post("api/notification/create", { phase: 1 });
      await API.post("api/notification/send", {});

      dispatch(
        updatePhase(
          1,
          authUser
            ? authUser.userPhases._id
            : JSON.parse(localStorage.getItem("auth_user")).userPhases._id,
          history
        )
      );
      dispatch(getScore(history));
    } catch (error) {
      dispatch({ type: FETCH_SUCCESS });
      toast.error(error?.message);
    }
  };

export const updatePhase = (num, userPhasesId, history) => async (dispatch) => {
  dispatch({ type: FETCH_START });
  try {
    switch (num) {
      case 0:
        await API.put("api/userPhase", {
          userPhaseId: userPhasesId,
          phase0: true,
        });
        break;
      case 1:
        await API.put("api/userPhase", {
          userPhaseId: userPhasesId,
          phase1: true,
        });
        toast.success("History submitted successfully");
        break;
      case 2:
        await API.put("api/userPhase", {
          userPhaseId: userPhasesId,
          phase2: true,
        });
        break;
      case 3:
        await API.put("api/userPhase", {
          userPhaseId: userPhasesId,
          phase3: true,
        });
        break;
      case 4:
        await API.put("api/userPhase", {
          userPhaseId: userPhasesId,
          phase4: true,
        });
        break;
      case 5:
        await API.put("api/userPhase", {
          userPhaseId: userPhasesId,
          phase5: true,
        });
        break;
      default:
        break;
    }
    dispatch({
      type: UPDATE_PHASES,
      payload: { phase: { number: num, state: true } },
    });
    if (history) {
      history.push("/getstarted");
    }
    dispatch({ type: FETCH_SUCCESS });
  } catch (error) {
    dispatch({ type: FETCH_SUCCESS });
    toast.error(error?.message);
  }
};
export const fillInfo = (uid) => async (dispatch) => {
  dispatch({ type: FETCH_START });
  try {
    const { data } = await API.get(`api/user/id`);

    if (data.success === true) {
      dispatch({
        type: AUTH_USER,
        payload: data.user,
      });

      // ---------pb----------
      dispatch({
        type: PROFILE,
        payload: data.user,
      });
      //-----------------------

      for (var i = 0; i < Object.keys(data.user.userPhases).length; i++) {
        if (data.user.userPhases[`${Object.keys(data.user.userPhases)[i]}`]) {
          dispatch({
            type: UPDATE_PHASES,
            payload: { phase: { number: i, state: true } },
          });
        }
      }
    } else {
      dispatch({ type: FETCH_SUCCESS });
      toast.error(data.message);
    }
  } catch (error) {
    dispatch({ type: FETCH_SUCCESS });
    toast.error(error?.message);
  }
};

export const clearPhase1 = (history) => async (dispatch) => {
  dispatch({ type: FETCH_START });
  try {
    await API.post("api/answers/deletebyUserId", {});
    dispatch({ type: TEST_RESULTS_READY, payload: false });
    dispatch({ type: FETCH_SUCCESS });
    dispatch({
      type: UPDATE_PHASES,
      payload: { phase: { number: 1, state: false } },
    });
  } catch (error) {
    dispatch({ type: FETCH_SUCCESS });
    toast.error(error?.message);
  }
};
