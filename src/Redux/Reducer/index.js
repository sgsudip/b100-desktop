import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Questions from "./Questions";
import Common from "./Common";
import Auth from "./Auth";
import Profile from './Profile'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    PhaseData: Questions,
    commonData: Common,
    authenticationData: Auth,
    profileData: Profile
  });

export default createRootReducer;
