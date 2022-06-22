import React, { useEffect, useState } from "react";
import {
  // Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import {
  // LockOutlined,
  ArrowForward,
  Check,
  ArrowBack,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { LoginValidationSchema } from "../../Helpers/ValidationSchema";
import {
  submitPhoneNumber,
  checkCode,
  setPhoneSubmit,
} from "../../Redux/Actions";
import Countries from "../../Assets/country.json";
import CountryCodeDialog from "../../Components/CountryCodeDialog";
import CoverImg from "../../Assets/Images/cover-img.png";
import Header from "../../Components/Header";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 0),
    backgroundColor: "unset",
    color: "#000",
    fontFamily: "muli",
    fontWeight: 800,
    textTransform: "uppercase !important",
    fontSize: 14,
    "&:active": {
      boxShadow: "none",
      backgroundColor: "unset",
    },
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "unset",
    },
  },
  avatar: {
    backgroundColor: "white",
  },
}));

export default function SignIn(props) {
  const { history, setIsLoggedIn } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { phone_number_submit } = useSelector(
    ({ authenticationData }) => authenticationData
  );

  const { loading } = useSelector(({ commonData }) => commonData);
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      country_code: 1,
      phone_number: "",
      OTP: "",
    },
    enableReinitialize: true,
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      if (!loading) {
        setIsDisabled(true);
        dispatch(submitPhoneNumber(values, history));
        setIsDisabled(false);
      }
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  return (
    <>
      <Header />
      <Container
        fluid
        component="main"
        className="signinclass signinclass-block"
        maxWidth="xs"
      >
        {/* <Header/> */}
        {/* <Button
          type="submit"
          variant="contained"
          className="back-btn"
          startIcon={<ArrowBack />}
          // onClick={() => history.push("/genderinfo")}
          // onClick={() => history.push("/heartcare")}
          onClick={() => history.push("/email")}
        >
          Back
        </Button> */}
        <Grid container spacing={2}>
          <Grid xs={12} lg={6} className="d-none d-lg-block landscape-img">
            <img src={CoverImg} alt="" className="cover-img" />
          </Grid>
          <Grid xs={12} lg={6}>
            <div className={[classes.paper, "signinCard"].join(" ")}>
              {/* <Avatar className={classes.avatar}>
                <LockOutlined />
              </Avatar> */}
              {phone_number_submit ? (
                <Typography component="h5" variant="h5" className="page-title">
                  Enter Confirmation Code
                </Typography>
              ) : (
                <>
                  <div className="mb-5">
                    <Typography
                      component="h5"
                      variant="h5"
                      className="page-title"
                    >
                      {/* We need to make sure you are a real person. */}
                      To ensure your information is even more secure, we've
                      added 2-Step Verification.
                    </Typography>
                    <Typography className="w-100" style={{ color: "#acacac" }}>
                      We will send a code to your mobile number.
                    </Typography>
                  </div>
                  <Typography className="page-title w-100">
                    Please enter your mobile phone number
                  </Typography>
                </>
              )}
              <form
                className={classes.form}
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <div className="d-flex align-items-center justify-content-center mb-4">
                  {phone_number_submit ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      className="px-0"
                      inputProps={{
                        maxLength: 6,
                      }}
                      placeholder="Enter 6-Digit Code"
                      value={formik.values.OTP}
                      keyboardType="numeric"
                      textContentType="telephoneNumber"
                      onChange={(event) => {
                        if (event.target.value.length === 6) {
                          dispatch(
                            checkCode(
                              { ...formik.values, OTP: event.target.value },
                              () => setIsLoggedIn(true),
                              history
                            )
                          );
                        }
                        formik.setValues({
                          ...formik.values,
                          OTP: event.target.value,
                        });
                      }}
                    />
                  ) : (
                    <>
                      <TextField
                        variant="outlined"
                        className="px-0"
                        defaultValue={Countries[0].country_code}
                        value={"+" + formik.values.country_code}
                        onClick={() => {
                          setOpen(true);
                        }}
                        style={{
                          width:
                            (formik.values.country_code + "").length === 1
                              ? 60
                              : (formik.values.country_code + "").length === 2
                              ? 80
                              : (formik.values.country_code + "").length === 3
                              ? 100
                              : 120,
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      />

                      <TextField
                        fullWidth
                        required
                        className="px-0"
                        variant="outlined"
                        keyboardType="numeric"
                        textContentType="telephoneNumber"
                        name="phone_number"
                        placeholder="000 000 0000"
                        inputProps={{
                          maxLength: 12,
                        }}
                        value={formik.values.phone_number}
                        onChange={(event) => {
                          const text = event.target.value;
                          var number = text.replace(/[^\d]/g, "");
                          if (
                            number.length === 3 &&
                            number.length >= formik.values.phone_number.length
                          ) {
                            number = number + " ";
                          } else if (number.length >= 4 && number.length <= 6) {
                            number =
                              number.substring(0, 3) +
                              " " +
                              number.substring(3, number.length);
                          } else if (number.length >= 7) {
                            number =
                              number.substring(0, 3) +
                              " " +
                              number.substring(3, 6) +
                              " " +
                              number.substring(6, number.length);
                            if (number.length === 12) {
                            } else if (number.length === 13) {
                              number =
                                number.substring(0, 1) +
                                " " +
                                number.substring(1, 4) +
                                " " +
                                number.substring(4, 7) +
                                number.substring(7, number.length);
                            }
                          }
                          formik.setValues({
                            ...formik.values,
                            phone_number: number,
                          });
                        }}
                      />
                    </>
                  )}
                </div>
                {!phone_number_submit && (
                  <div
                    className="mt-1 MuiFormHelperText-root MuiFormHelperText-contained Mui-required"
                    style={
                      formik.touched.phone_number &&
                      Boolean(formik.errors.phone_number)
                        ? {
                            color: "red",
                          }
                        : {}
                    }
                  >
                    {}
                    {formik.touched.phone_number && formik.errors.phone_number
                      ? formik.errors.phone_number
                      : !formik.values.phone_number
                      ? ""
                      : // ? "Please enter mobile number to get started"
                        ""}
                  </div>
                )}
                {phone_number_submit && (
                  <>
                    <div className="mt-1 MuiFormHelperText-root MuiFormHelperText-contained Mui-required">
                      We sent a 6 digit confirmation code to +
                      {formik.values.country_code} {formik.values.phone_number}.
                    </div>
                    <div className="mt-1 MuiFormHelperText-root MuiFormHelperText-contained Mui-required">
                      You should receive it in a few seconds.
                    </div>
                  </>
                )}
                <div>
                  <Typography style={{ color: "#666666" }}>
                    *Message and data rates may apply
                  </Typography>
                </div>
                {/* <div className="w-100 text-center"> */}
                {/* <Button
                    type="button"
                    variant="contained"
                    className="back-btn"
                    startIcon={<ArrowBack />}
                    // onClick={() => history.push("/genderinfo")}
                    // onClick={() => history.push("/heartcare")}
                    onClick={() => history.push("/email")}
                  >
                    Back
                  </Button> */}
                <div className="w-100 text-center">
                  <Button
                    type="button"
                    variant="contained"
                    className="back-btn"
                    startIcon={<ArrowBack />}
                    // onClick={() => history.push("/genderinfo")}
                    // onClick={() => history.push("/heartcare")}
                    onClick={() =>
                      phone_number_submit
                        ? dispatch(setPhoneSubmit(false))
                        : history.push("/email")
                    }
                  >
                    Back
                  </Button>

                  {phone_number_submit ? (
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.submit}
                      disabled={!phone_number_submit || loading}
                      endIcon={loading ? <Check /> : null}
                    >
                      {loading ? "Sent" : "Re-send Confirmation Code"}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant={"contained"}
                      // color={"success"}
                      className={classes.submit}
                      disabled={loading || isDisabled}
                      endIcon={
                        loading ? (
                          phone_number_submit ? null : (
                            <Check />
                          )
                        ) : (
                          <ArrowForward />
                        )
                      }
                    >
                      {loading ? "Sent" : "Send OTP"}
                    </Button>
                  )}
                </div>
              </form>
              <CountryCodeDialog
                open={open}
                title="Select Country Code"
                selectedValue={formik.values.country_code}
                onClose={(country) => {
                  formik.setValues({
                    ...formik.values,
                    country_code: country
                      ? country.country_code
                      : formik.values.country_code,
                  });
                  setOpen(false);
                }}
              />
            </div>
            {/* <Paper elevation={3}>
              <CssBaseline />
            </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
