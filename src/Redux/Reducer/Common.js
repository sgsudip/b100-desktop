import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, TEST_RESULTS_READY } from "../ActionTypes";

const INIT_STATE = {
  loading: false,
  testResultsReady: false
};

const Common = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case TEST_RESULTS_READY: {
      return {
        ...state,
        testResultsReady: action.payload
      }
    }
    default:
      return state;
  }
};

export default Common;
