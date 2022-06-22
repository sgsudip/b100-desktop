import { PHONE_NUMBER_SUBMIT, AUTH_USER } from "../ActionTypes";

const INIT_STATE = {
  phone_number_submit: false,
  authUser:null
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PHONE_NUMBER_SUBMIT: {
      return {
        ...state,
        phone_number_submit: action.payload,
      };
    }
    case AUTH_USER:{
        return {
          ...state,
          authUser: action.payload,
        };
    }
    default:
      return state;
  }
};

export default Auth;
