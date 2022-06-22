import React, { useState } from "react";
import { Button, Typography, Container, Grid } from "@material-ui/core";
import Header from "../../Components/Header";
import Image from "../../Assets/Images/cover-img.png";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import MaleImage from "../../Assets/Images/male.png";
import FemaleImage from "../../Assets/Images/female.png";

// import selectedMale from "../../Assets/Images/FullColor/1x/Malefull.png";
// import selectedFemale from "../../Assets/Images/FullColor/1x/Femalefull.png";
// import deselectedMale from "../../Assets/Images/Deselected/1x/Male.png";
// import deselectedFemale from "../../Assets/Images/Deselected/1x/Female.png";

const Gender = (props) => {
  const { history } = props;

  const [gender, setGender] = useState("");

  const goBack = () => {
    history.push("/userinfo");
  };

  const movetoNext = () => {
    if (gender) {
      localStorage.setItem("Gender", gender);
      // history.push("/signin");
      history.push("/email");
    }
  };

  return (
    <>
      <Header />
      <Container
        fluid
        component="main"
        className="signinclass signinclass-block content-height"
        maxWidth="xs"
      >
        <Button
          type="submit"
          variant="contained"
          className="back-btn"
          startIcon={<ArrowBack />}
          onClick={() => history.push("/userinfo")}
        >
          Back
        </Button>
        <Grid container spacing={2}>
          <Grid xs={12} lg={6} className="d-none d-lg-block landscape-img">
            <img src={Image} alt={"B100 logo"} className="cover-img" />
          </Grid>
          <Grid xs={12} lg={6} className="flex-center">
            <div className="middle-content rightcontentdiv">
              {/* <Typography className="page-title">
                Tell us your gender! This help us give you the most accurate
                plan possible
              </Typography> */}
              <Typography className="page-title page-title-md">
                At BIRTH, what gender was documented on your birth certificate?
              </Typography>
              <div className="gender-radio-group w-100">
                <Button
                  className={gender === "Male" ? "selected" : ""}
                  onClick={() => setGender("Male")}
                >
                  <img
                    // src={gender === "Male" ? selectedMale : deselectedMale}
                    src={MaleImage}
                    alt={"Male icon"}
                    className="mr-2"
                  />
                  Male
                </Button>
                <Button
                  className={gender === "Female" ? "selected" : ""}
                  onClick={() => setGender("Female")}
                >
                  <img
                    // src={
                    //   gender === "Female" ? selectedFemale : deselectedFemale
                    // }
                    src={FemaleImage}
                    alt={"Female icon"}
                    className="mr-2"
                  />
                  Female
                </Button>
              </div>
              {/* <Typography className="form-text">
                Don't worry we won't share your information with anyone!
              </Typography> */}
              <div className="control-btn justify-content-center">
                <Button
                  className="rounded-button footer-back-btn"
                  endIcon={<ArrowBack />}
                  onClick={() => goBack()}
                />
                <Button
                  className="rounded-button"
                  endIcon={<ArrowForward />}
                  onClick={() => movetoNext()}
                  disabled={!gender}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Gender;
