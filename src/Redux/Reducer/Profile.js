import { PROFILE, SUBMIT_PROFILE, UPLOAD_IMAGE } from "../ActionTypes";

const INITIAL_STATE = {
  phoneNumber: "",
  email: "",
  firstName: "",
  lastName: "",
  zip: "",
  uid: "",
  error: "",
  sex: "male",
  dob: "",
  image_url: "www.google.com",
  submitted: false,
};

const Profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE: {
      const { sex, dob, lastName, firstName, email, image_url, zip, phone } =
        action.payload;
      return {
        ...state,
        sex,
        dob,
        lastName,
        firstName,
        email,
        image_url: image_url,
        zip,
        phoneNumber: phone,
      };
    }

    case SUBMIT_PROFILE: {
      return {
        ...state,
        submitted: action.payload,
      };
    }

    case UPLOAD_IMAGE: {
      const { document } = action.payload;

      return {
        ...state,
        image_url: document,
      };
    }

    default:
      return state;
  }
};

export default Profile;
