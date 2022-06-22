import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Image from "../../Assets/Images/Group2-2x.png";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  List,
  ListItem,
  IconButton,
  Button,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { ArrowBack, Edit } from "@material-ui/icons";

import selectedMale from "../../Assets/Images/FullColor/1x/Malefull.png";
import selectedFemale from "../../Assets/Images/FullColor/1x/Femalefull.png";

import deselectedMale from "../../Assets/Images/Deselected/1x/Male.png";
import deselectedFemale from "../../Assets/Images/Deselected/1x/Female.png";

import moment from "moment";
// import { toast } from "react-toastify";
import { updatePhase } from "../../Redux/Actions/QuestionsList";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, uploadImage } from "../../Redux/Actions/Profile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 460,
    padding: "20px 25px",
    backgroundColor: theme.palette.background.paper,
    overflowY: "auto",
  },
  listItem: {
    padding: "5px 0",
    // fontFamily: "MultiFonts !important",
  },
  avatarContainer: {
    padding: "10px",
  },
  input: {
    display: "none",
  },
  avatarImage: {
    objectFit: "none",
  },
  blurAvatarImage: {
    objectFit: "none",
    filter: "blur(0.5px)",
  },
  roundedCheckBox: {
    borderRadius: "50px",
    // background:"white !important",
    // color: "#ff4c6e",
    // '&$checked': {
    //   color: "#c0c0c0 !important",
    // },
  },
  notCompletedColor: {
    color: "rgb(0 0 0 / 26%) !important",
  },
  CompletedColor: {
    color: "black !important",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(219, 77, 105)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(230, 77, 105)",
    },
  },
  nextStepText: {
    color: "#ff4c6e !important",
    marginRight: "10px",
    fontSize: "14px",
    fontFamily: "muli !important",
  },
}));

const Form = (props) => {
  const dispatch = useDispatch();

  const {
    sex,
    dob,
    lastName,
    firstName,
    email,
    image_url,
    zip,
    phoneNumber,
    submitted,
  } = useSelector(({ profileData }) => profileData);

  const { history } = props;

  const [formIndex, setFormIndex] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileObj, setFileObj] = useState(null);

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [genderErrorFlag, setGenderErrorFlag] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    zip: "",
    dob: "",
    sex: "",
  });

  let minBirthDate = moment(new Date()).add(-100, "years"); // It should be date object
  let maxBirthDate = moment(new Date()).add(-18, "years"); // It should be date object

  useEffect(() => {
    let user = localStorage.getItem("auth_user");
    if (user) user = JSON.parse(user);
    setUserData(user);

    setFormValues({
      sex,
      dob,
      lastName,
      firstName,
      email,
      image_url,
      zip,
      phoneNumber,
    });

    formik1.setValues({ firstName, lastName, email });
    formik2.setValues({ dob, zip });
    setSelectedFile(image_url);
    // setUserData(props)
  }, [sex, dob, lastName, firstName, email, zip, phoneNumber, image_url]);

  // const getProfile = async () => {

  //   let user = localStorage.getItem("auth_user")

  //   if (user) user = JSON.parse(user)
  //   let profile = await apiCall("get", `api/user/id`, null)

  //   if (profile && profile.success) profile = profile.user

  //   setUserData(user);

  //   setFormValues({
  //     email: profile.email,
  //     firstName: profile.firstName,
  //     lastName: profile.lastName,
  //     zip: profile.zip,
  //     birthDate: profile.dob ? moment(profile.dob).format("yyyy-MM-DD") : "",
  //     gender: profile.sex,
  //   })

  //   if (profile && profile.image_url) setSelectedFile(profile.image_url)

  //   formik1.setValues({
  //     email: profile.email,
  //     firstName: profile.firstName,
  //     lastName: profile.lastName,
  //   })

  //   formik2.setValues({
  //     zip: profile.zip,
  //     birthDate: profile.dob ? moment(profile.dob).format("yyyy-MM-DD") : "",
  //   })
  // }

  const classes = useStyles();
  const handleUploadClick = (event) => {
    var file = event.target.files[0];

    setFileObj(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile([reader.result]);
    };

    setSelectedFile(event.target.files[0]);
  };

  const validationSchema1 = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required")
      .label("Email"),
    firstName: yup
      .string("Enter your FirstName")
      .required("First name is required")
      .label("Last name"),
    lastName: yup
      .string("Enter your LastName")
      .required("Last name is required")
      .label("First name"),
  });

  const validationSchema2 = yup.object({
    zip: yup
      .number("Enter your zip code")
      .min(10000, "Zip code should be 5 digit number")
      .max(99999, "Zip code should be 5 digit number")
      .required("Zip code is required")
      .label("Zip code")
      .typeError("Zip code should be a number"),
    dob: yup
      .date("Enter your Birth date")
      .required("Birth date is required")
      .label("Birth date")
      .max(maxBirthDate, "B100 is only for those between 18 and 100")
      .min(minBirthDate, "B100 is only for those between 18 and 100"),
  });

  const formik1 = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },

    enableReinitialize: true,
    validationSchema: validationSchema1,

    onSubmit: (values) => {
      setFormIndex(formIndex + 1);

      setFormValues({
        ...formValues,
        ...values,
      });
    },
  });

  const formik2 = useFormik({
    initialValues: {
      zip: "",
      dob: "",
    },

    enableReinitialize: true,
    validationSchema: validationSchema2,

    onSubmit: (values) => {
      // if (formValues.sex)
      submitProfile({ ...formValues, ...values });
    },
  });

  const handleGender = async (sex) => {
    if (sex) setGenderErrorFlag(false);
    setFormValues({ ...formValues, sex: sex });
  };

  const validateGender = async () => {
    if (formValues.sex === "") setGenderErrorFlag(true);
    else setGenderErrorFlag(false);
  };

  const submitProfile = async (formData) => {
    setLoading(true);

    let req = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      zip: formData.zip,
      dob: formData.dob,
      sex: formData.sex,
    };

    // let params = {
    //   _id: userData._id
    // }

    // let headers = {
    //   'Content-Type': 'multipart/form-data'
    // }

    dispatch(setProfile(req, userData._id, history));

    if (fileObj && fileObj.name) {
      const form = new FormData();
      form.append("photos", fileObj);
      // let imageUploadResponse = await apiCall("post", "api/upload/images/avatar", form, params, headers)
      dispatch(uploadImage(form, userData._id));
    }

    // setLoading(true)
    // let profileUpdateResponse = await apiCall("put", "api/user/id", req, params)
    if (submitted) {
      dispatch(updatePhase(0, userData.userPhases._id, history));
    } else {
      console.log("Error in submitting  profile");
    }

    setLoading(false);
  };

  const goBack = async () => {
    if (formIndex === 1) history.push("/phases");
    if (formIndex === 2) setFormIndex(1);
  };

  return (
    <div className={"background mx-auto top-spacing"}>
      <div className={["maincontent"].join(" ")}>
        <IconButton
          className={`back-button`}
          aria-label="back"
          onClick={() => goBack()}
        >
          <ArrowBack />
        </IconButton>

        {formIndex === 1 ? (
          <Card
            className={`${classes.root} mobile-card`}
            style={{ marginBottom: "10px" }}
          >
            <List dense>
              <ListItem className={"justify-content-center hover-false"}>
                <Typography className="box-title">
                  First Tell Us About Yourself
                </Typography>
              </ListItem>
            </List>

            <form className={classes.form} onSubmit={formik1.handleSubmit}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
              />

              <label
                htmlFor="contained-button-file"
                className="d-block text-center border-bottom pb-4 mb-3"
              >
                <Fab component="span" className={"avatar-img"}>
                  <img
                    alt="Profile"
                    width="100%"
                    className={classes.media}
                    src={selectedFile ? selectedFile : Image}
                  />
                  <Edit className="edit-icon"></Edit>
                </Fab>
              </label>

              <Typography className="form-label" component="h6" variant="h6">
                Email Address{" "}
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formik1.values.email}
                onChange={formik1.handleChange}
                error={formik1.touched.email && Boolean(formik1.errors.email)}
                helperText={formik1.touched.email && formik1.errors.email}
                className="text-form-control"
              />

              <Typography
                className="form-label mt-3"
                component="h6"
                variant="h6"
              >
                Your Name{" "}
              </Typography>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formik1.values.firstName}
                onChange={formik1.handleChange}
                error={
                  formik1.touched.firstName && Boolean(formik1.errors.firstName)
                }
                helperText={
                  formik1.touched.firstName && formik1.errors.firstName
                }
                className="text-form-control"
              />

              <TextField
                aria-placeholder="Parth"
                fullWidth
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formik1.values.lastName}
                onChange={formik1.handleChange}
                error={
                  formik1.touched.lastName && Boolean(formik1.errors.lastName)
                }
                helperText={formik1.touched.lastName && formik1.errors.lastName}
                className="text-form-control mt-2"
              />

              <List dense>
                <ListItem
                  button
                  className={"justify-content-center hover-false"}
                >
                  <Typography className="info-text ">
                    We won't share your information with anyone!
                  </Typography>
                </ListItem>
              </List>

              <Button
                type="submit"
                variant={"contained"}
                // color={"success"}
                className={"btn-block singup-btn"}
                disabled={
                  !(
                    formik1.values.email &&
                    formik1.values.firstName &&
                    formik1.values.lastName
                  )
                }
              >
                Continue
              </Button>
            </form>
          </Card>
        ) : (
          // Second Form
          <Card
            className={`${classes.root} mobile-card`}
            style={{ marginBottom: "10px" }}
          >
            <List dense>
              <ListItem
                className={`${classes.listItem} flex-column justify-content-center hover-false border-bottom pb-4`}
              >
                <Typography className="box-title">Let's Get Started</Typography>
                <Typography className="sub-box-title px-2 px-md-4 text-center mt-2">
                  {" "}
                  First, we'll need a little background informations{" "}
                </Typography>
              </ListItem>
            </List>

            <form className={classes.form} onSubmit={formik2.handleSubmit}>
              <Typography className="form-label" component="h6" variant="h6">
                What is your zip code?{" "}
              </Typography>
              <TextField
                fullWidth
                id="zip"
                name="zip"
                type="text"
                value={formik2.values.zip}
                onChange={(e) =>
                  !isNaN(e.target.value) ? formik2.handleChange(e) : null
                }
                error={formik2.touched.zip && Boolean(formik2.errors.zip)}
                helperText={formik2.touched.zip && formik2.errors.zip}
                inputProps={{ maxLength: 5 }}
                className="text-form-control"
              />

              <Typography
                className="form-label mt-3"
                component="h6"
                variant="h6"
              >
                {" "}
                When were you born?{" "}
              </Typography>

              <TextField
                fullWidth
                id="dob"
                name="dob"
                type="date"
                value={formik2.values.dob}
                onChange={formik2.handleChange}
                error={formik2.touched.dob && Boolean(formik2.errors.dob)}
                helperText={formik2.touched.dob && formik2.errors.dob}
                // inputProps={{ min: minBirthDate, max: maxBirthDate }}
                className="text-form-control"
              />

              <Typography
                className="form-label mt-3"
                component="h6"
                variant="h6"
              >
                {" "}
                What is your natural gender?{" "}
              </Typography>

              <div className="gender-selection d-flex w-100">
                <div className={` d-flex flex-column text-center gender-col`}>
                  <img
                    className="gender-selector"
                    alt="Male"
                    src={
                      formValues.sex === "Male" ? selectedMale : deselectedMale
                    }
                    onClick={() => handleGender("Male")}
                  />
                  <span
                    className={
                      formValues.sex === "Male" ? "text-bold" : "text-grey"
                    }
                  >
                    Male
                  </span>
                </div>

                <div className={`d-flex flex-column text-center gender-col`}>
                  <img
                    className="gender-selector"
                    alt="Female"
                    src={
                      formValues.sex === "Female"
                        ? selectedFemale
                        : deselectedFemale
                    }
                    onClick={() => handleGender("Female")}
                  />
                  <span
                    className={
                      formValues.sex === "Female" ? "text-bold" : "text-grey"
                    }
                  >
                    Female
                  </span>
                </div>
              </div>

              {genderErrorFlag ? (
                <FormHelperText style={{ color: "red" }}>
                  {" "}
                  Gender is required{" "}
                </FormHelperText>
              ) : null}

              <Button
                type="submit"
                variant={"contained"}
                // color={"success"}
                className={`${classes.submit} singup-btn w-100 next-btn`}
                onClick={() => validateGender()}
                disabled={
                  !(
                    formik2.values.zip &&
                    formik2.values.dob &&
                    formValues.sex
                  ) || loading
                }
              >
                Next
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
    // <div></div>
  );
};

export default Form;
