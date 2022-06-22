import {
  SET_QUESTIONS_LIST,
  SET_PHASE_1_SCORE,
  UPDATE_PHASES,
} from "../ActionTypes";

const INIT_STATE = {
  Phase1QuestionsList: null,
  Phase1Scores: null,
  backgroundPhase: false,
  historyPhase: false,
  choicesPhase: false,
  geneticsPhase: false,
  plaquePhase: false,
  bluePrint: false,
};

const Questions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_QUESTIONS_LIST: {
      return {
        ...state,
        Phase1QuestionsList: action.payload,
      };
    }
    case SET_PHASE_1_SCORE: {
      return {
        ...state,
        Phase1Scores: action.payload,
      };
    }
    // case PROFILE: {
    //   const { phase0, phase1, phase2, phase3, phase4, _id, reccomended } =
    //     action.payload.userPhases;

    //   return {
    //     reccomended,
    //     ID: _id,
    //     profile: phase0,
    //     questions: phase1,
    //     kit: phase2,
    //     treatment: phase3,
    //     centers: phase4,
    //   };
    // }
    case UPDATE_PHASES: {
      switch (action.payload.phase.number) {
        case 0:
          return { ...state, backgroundPhase: action.payload.phase.state };
        case 1:
          return { ...state, historyPhase: action.payload.phase.state };
        case 2:
          return { ...state, choicesPhase: action.payload.phase.state };
        case 3:
          return { ...state, geneticsPhase: action.payload.phase.state };
        case 4:
          return { ...state, plaquePhase: action.payload.phase.state };
        case 5:
          return { ...state, bluePrint: action.payload.phase.state };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};

export default Questions;
