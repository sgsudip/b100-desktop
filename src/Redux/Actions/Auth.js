import { toast } from "react-toastify";
import {
  AUTH_USER,
  FETCH_START,
  UPDATE_PHASES,
  FETCH_SUCCESS,
  PHONE_NUMBER_SUBMIT,
} from "../ActionTypes";
import * as API from "../../constants/api";

export const submitPhoneNumber = (requestData, history) => async (dispatch) => {
  dispatch({ type: FETCH_START });
  try {
    const response = await API.post("api/auth/resendtwilio", {
      countryCode: "+" + requestData.country_code,
      phone: requestData.phone_number,
    });
    const { data } = response;
    if (data.success) {
      dispatch({ type: PHONE_NUMBER_SUBMIT, payload: data.success });
      // toast.success("OTP sent successfully");
    } else {
      toast.error(data.message);
    }
    dispatch({ type: FETCH_SUCCESS });
  } catch (error) {
    dispatch({ type: FETCH_SUCCESS });
    toast.error(error?.message);
  }
};
export const checkCode =
  (requestData, callback, history) => async (dispatch) => {
    const body = {
      countryCode: "+" + requestData.country_code,
      phone: requestData.phone_number,
      passcode: requestData.OTP,
    };
    try {
      const response = await API.post("api/auth/verifytwilio", body);
      dispatch({ type: AUTH_USER, payload: response.data.user });
      localStorage.setItem("auth", response.headers.authorization);
      localStorage.setItem("auth_user", JSON.stringify(response.data.user));
      for (
        var i = 0;
        i < Object.keys(response.data.user.userPhases).length;
        i++
      ) {
        if (
          response.data.user.userPhases[
            `${Object.keys(response.data.user.userPhases)[i]}`
          ]
        ) {
          dispatch({
            type: UPDATE_PHASES,
            payload: { phase: { number: i, state: true } },
          });
        }
      }
      dispatch({ type: PHONE_NUMBER_SUBMIT, payload: false });
      if (callback) {
        callback();
      }
    } catch (error) {
      dispatch({ type: FETCH_SUCCESS });
      toast.error("Incorrect OTP");
    }
  };

export const setPhoneSubmit = (value) => (dispatch) => {
  dispatch({ type: PHONE_NUMBER_SUBMIT, payload: value });
};
