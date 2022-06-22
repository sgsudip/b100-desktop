// import React, { useState } from "react";
// import {
//   Button,
//   // TextField,
//   Typography,
//   Container,
//   Grid,
//   TextField,
// } from "@material-ui/core";
// import Header from "../../Components/Header";
// import Image from "../../Assets/Images/cover-img.png";
// import { ArrowBack, ArrowForward } from "@material-ui/icons";
// import moment from "moment";
// import InputMask from "react-input-mask";
// import MaleImage from "../../Assets/Images/male.png";
// import FemaleImage from "../../Assets/Images/female.png";

// const HowOld = (props) => {
//   const { history } = props;

//   const [DOB, setDOB] = useState("");
//   const [dobError, setDobError] = useState("");
//   const [gender, setGender] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   const minBirthDate = moment(new Date()); // It should be date object
//   const maxBirthDate = moment(new Date()); // It should be date object

//   const movetoNext = () => {
//     if (
//       minBirthDate.diff(moment(DOB), "years") < 100 &&
//       maxBirthDate.diff(moment(DOB), "years") >= 18 &&
//       zipCode &&
//       gender &&
//       email
//     ) {
//       const userData = {
//         firstName: firstName,
//         lastName: lastName,
//         dob: moment(DOB).format("MM/DD/YYYY"),
//         sex: gender,
//         email: email,
//         zip: Number(zipCode),
//       };
//       localStorage.setItem("UserData", JSON.stringify(userData));
//       setDobError("");
//       // history.push("/genderinfo");
//       history.push("/signin");
//     } else {
//       setDobError("B100 is only for those between 18 and 100");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container
//         fluid
//         component="main"
//         className="signinclass signinclass-block content-height"
//         maxWidth="xs"
//       >
//         {/* <Button
//           type="submit"
//           variant="contained"
//           className="back-btn"
//           startIcon={<ArrowBack />}
//           onClick={() => history.push("/heartcare")}
//         >
//           Back
//         </Button> */}
//         <Grid container>
//           <Grid xs={12} lg={6} className="d-none d-lg-block landscape-img">
//             <img src={Image} alt={"B100 logo"} className="cover-img" />
//           </Grid>
//           <Grid xs={12} lg={6} className="flex-center user-info">
//             <div className="middle-content rightcontentdiv">
//               <Typography className="page-title page-title-md">
//                 What is your full name?
//               </Typography>
//               <div className="gender-radio-group justify-content-between w-100">
//                 <TextField
//                   variant="outlined"
//                   placeholder="FirstName"
//                   style={{ width: "49%" }}
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//                 <TextField
//                   variant="outlined"
//                   placeholder="LastName"
//                   style={{ width: "49%" }}
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </div>
//               <Typography className="page-title page-title-md">
//                 What is your primary residence zip code?
//               </Typography>
//               <TextField
//                 variant="outlined"
//                 className="custom-control email"
//                 placeholder="Zip Code"
//                 value={zipCode}
//                 onChange={(e) => setZipCode(e.target.value)}
//                 inputProps={{ maxLength: 5 }}
//               />

//               <Typography className="page-title page-title-md">
//                 At BIRTH, what gender was documented on your birth certificate?
//               </Typography>
//               <div className="gender-radio-group w-100">
//                 <Button
//                   className={gender === "Male" ? "selected" : ""}
//                   onClick={() => setGender("Male")}
//                 >
//                   <img
//                     // src={gender === "Male" ? selectedMale : deselectedMale}
//                     src={MaleImage}
//                     alt={"Male icon"}
//                     className="mr-2"
//                   />
//                   Male
//                 </Button>
//                 <Button
//                   className={gender === "Female" ? "selected" : ""}
//                   onClick={() => setGender("Female")}
//                 >
//                   <img
//                     // src={
//                     //   gender === "Female" ? selectedFemale : deselectedFemale
//                     // }
//                     src={FemaleImage}
//                     alt={"Female icon"}
//                     className="mr-2"
//                   />
//                   Female
//                 </Button>
//               </div>

//               <Typography className="page-title page-title-md">
//                 What is your birthday?
//               </Typography>
//               {dobError && <p>{dobError}</p>}

//               <InputMask
//                 mask="99/99/9999"
//                 variant="outlined"
//                 // type="date"
//                 placeholder="mm/dd/yyyy"
//                 className="age-info-input custom-control mw-100 w-100"
//                 value={DOB}
//                 onChange={
//                   (e) => {
//                     setDOB(e.target.value);
//                   }
//                   // setDOB(moment(e.target.value).format("yyyy-MM-DD"))
//                 }
//               />
//               <Typography className="page-title page-title-md mb-4">
//                 What is your e-mail address?
//               </Typography>
//               <TextField
//                 variant="outlined"
//                 placeholder="E-mail Address"
//                 className="custom-control email"
//                 value={email}
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 // inputProps={{ maxLength: 5 }}
//               />
//               <div className="control-btn">
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   className="back-btn"
//                   startIcon={<ArrowBack />}
//                   onClick={() => history.push("/heartcare")}
//                 >
//                   Back
//                 </Button>

//                 <Button
//                   className="rounded-button fullbutton ml-0"
//                   endIcon={<ArrowForward />}
//                   onClick={() => movetoNext()}
//                   // disabled={!DOB}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </div>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default HowOld;

import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../Components/Header";
import Image from "../../Assets/Images/cover-img.png";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import moment from "moment";
import InputMask from "react-input-mask";
import MaleImage from "../../Assets/Images/male.png";
import FemaleImage from "../../Assets/Images/female.png";

const validationSchema = Yup.object().shape({
  DOB: Yup.string().required("Date Of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
});

const HowOld = (props) => {
  const { history } = props;

  const [dobError, setDobError] = useState("");

  const minBirthDate = moment(new Date()); // It should be date object
  const maxBirthDate = moment(new Date()); // It should be date object

  const movetoNext = (user) => {
    if (
      minBirthDate.diff(moment(user.DOB), "years") < 100 &&
      maxBirthDate.diff(moment(user.DOB), "years") >= 18 &&
      user.zipCode &&
      user.gender &&
      user.email
    ) {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        dob: moment(user.DOB).format("MM/DD/YYYY"),
        sex: user.gender,
        email: user.email,
        zip: Number(user.zipCode),
      };
      localStorage.setItem("UserData", JSON.stringify(userData));
      setDobError("");
      history.push("/signin");
    } else {
      setDobError("B100 is only for those between 18 and 100");
    }
  };

  const formik = useFormik({
    initialValues: {
      DOB: "",
      gender: "",
      zipCode: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema,
    onSubmit: (values) => movetoNext(values),
  });

  return (
    <>
      <Header />
      <Container
        fluid
        component="main"
        className="signinclass signinclass-block content-height"
        maxWidth="xs"
      >
        <Grid container>
          <Grid xs={12} lg={6} className="d-none d-lg-block landscape-img">
            <img src={Image} alt={"B100 logo"} className="cover-img" />
          </Grid>
          <Grid xs={12} lg={6} className="flex-center user-info">
            <div className="middle-content rightcontentdiv">
              <form onSubmit={formik.handleSubmit}>
                <Typography className="page-title page-title-md">
                  What is your full name?
                </Typography>
                <div className="gender-radio-group justify-content-between w-100 mb-4 mt-2">
                  <div style={{ width: "49%" }}>
                    <TextField
                      type="text"
                      variant="outlined"
                      name="firstName"
                      placeholder="First Name"
                      style={{ width: "100%" }}
                      // onChange={formik.handleChange}
                      onChange={(event) => {
                        const text = event.target.value;
                        var number = text.replace(/[^A-Za-z]/gi, "");
                        formik.setValues({
                          ...formik.values,
                          firstName: number,
                        });
                      }}
                      value={formik.values.firstName}
                    />
                    <div className="text-danger">
                      {formik.errors.firstName && formik.touched.firstName
                        ? formik.errors.firstName
                        : null}
                    </div>
                  </div>
                  <div style={{ width: "49%" }}>
                    <TextField
                      variant="outlined"
                      placeholder="Last Name"
                      name="lastName"
                      style={{ width: "100%" }}
                      // onChange={formik.handleChange}
                      onChange={(event) => {
                        const text = event.target.value;
                        var number = text.replace(/[^A-Za-z]/gi, "");
                        formik.setValues({
                          ...formik.values,
                          lastName: number,
                        });
                      }}
                      value={formik.values.lastName}
                    />
                    <div className="text-danger">
                      {formik.errors.lastName && formik.touched.lastName
                        ? formik.errors.lastName
                        : null}
                    </div>
                  </div>
                </div>
                <Typography className="page-title page-title-md">
                  What is your primary residence zip code?
                </Typography>
                <div className="mb-4">
                  <TextField
                    variant="outlined"
                    name="zipCode"
                    className="custom-control email "
                    placeholder="Zip Code"
                    value={formik.values.zipCode}
                    // onChange={formik.handleChange}
                    onChange={(event) => {
                      const text = event.target.value;
                      var number = text.replace(/[^\d]/g, "");
                      formik.setValues({
                        ...formik.values,
                        zipCode: number,
                      });
                    }}
                    inputProps={{ maxLength: 5 }}
                  />
                  <div className="text-danger error-field">
                    {formik.errors.zipCode && formik.touched.zipCode
                      ? formik.errors.zipCode
                      : null}
                  </div>
                </div>
                <Typography className="page-title page-title-md">
                  At BIRTH, what gender was documented on your birth
                  certificate?
                </Typography>
                <div className="mb-4">
                  <div className="gender-radio-group w-100 mb-0 mt-2">
                    <Button
                      name="gender"
                      value="Male"
                      className={
                        formik.values.gender === "Male" ? "selected" : ""
                      }
                      onClick={() => {
                        formik.setFieldValue(
                          ...formik.values.gender,
                          (formik.values.gender = "Male")
                        );
                      }}
                    >
                      <img src={MaleImage} alt={"Male icon"} className="mr-2" />
                      Male
                    </Button>
                    <Button
                      name="gender"
                      value="Female"
                      className={
                        formik.values.gender === "Female" ? "selected" : ""
                      }
                      onClick={() => {
                        formik.setFieldValue(
                          ...formik.values.gender,
                          (formik.values.gender = "Female")
                        );
                      }}
                    >
                      <img
                        src={FemaleImage}
                        alt={"Female icon"}
                        className="mr-2"
                      />
                      Female
                    </Button>
                  </div>
                  <div className="text-danger error-field">
                    {formik.errors.gender && formik.touched.gender
                      ? formik.errors.gender
                      : null}
                  </div>
                </div>

                <Typography className="page-title page-title-md">
                  What is your birthday?
                </Typography>
                <div className="mb-4">
                  {dobError && <p className="text-danger">{dobError}</p>}
                  <InputMask
                    mask="99/99/9999"
                    variant="outlined"
                    name="DOB"
                    // type="date"
                    placeholder="mm/dd/yyyy"
                    className="age-info-input custom-control mw-100 w-100"
                    value={formik.values.DOB}
                    onChange={formik.handleChange}
                  />
                  <div className="text-danger error-field">
                    {formik.errors.DOB && formik.touched.DOB
                      ? formik.errors.DOB
                      : null}
                  </div>
                </div>
                <Typography className="page-title page-title-md mb-4">
                  What is your e-mail address?
                </Typography>
                <div className="mb-4">
                  <TextField
                    name="email"
                    variant="outlined"
                    placeholder="E-mail Address"
                    className="custom-control email "
                    value={formik.values.email}
                    type="email"
                    onChange={formik.handleChange}
                  />
                  <div className="text-danger error-field">
                    {formik.errors.email && formik.touched.email
                      ? formik.errors.email
                      : null}
                  </div>
                </div>
                <div className="control-btn">
                  <Button
                    type="submit"
                    variant="contained"
                    className="back-btn"
                    startIcon={<ArrowBack />}
                    onClick={() => history.push("/heartcare")}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    className="rounded-button fullbutton ml-0"
                    endIcon={<ArrowForward />}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HowOld;
