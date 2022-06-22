import { toast } from "react-toastify";
import { apiCall } from "../../Helpers/common";
import { PROFILE, SUBMIT_PROFILE, UPLOAD_IMAGE } from "../ActionTypes";

export const getProfile = () => async (dispatch) => {
  let user = localStorage.getItem("auth_user");
  if (user) user = JSON.parse(user);

  let profile = await apiCall("get", `api/user/id`, null);

  if (profile && profile.success) {
    dispatch({
      type: PROFILE,
      payload: profile.user,
    });
  }
};

export const uploadImage = (data, uid) => async (dispatch) => {
  let headers = {
    "Content-Type": "multipart/form-data",
  };

  const profileAvatarUpdateResponse = await apiCall(
    "post",
    "api/upload/images/avatar",
    data,
    { _id: uid },
    headers
  );

  if (profileAvatarUpdateResponse.success) {
    dispatch({
      type: UPLOAD_IMAGE,
      payload: profileAvatarUpdateResponse.document,
    });
  }
};

export const setProfile = (data, uid) => async (dispatch) => {
  const profileUpdateResponse = await apiCall("put", "api/user/id", data, {
    _id: uid,
  });

  if (profileUpdateResponse.success) {
    // toast.success("Profile has been updated");
    // history.push("/phase")
    dispatch({
      type: SUBMIT_PROFILE,
      payload: true,
    });
  } else {
    toast.error(profileUpdateResponse.message);
  }
};
