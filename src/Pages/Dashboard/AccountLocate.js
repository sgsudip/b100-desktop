import {
  Button,
  Checkbox,
  Container,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Image from "../../Assets/Images/cover-img.png";
import { ArrowForward } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { clearPhase1 } from "../../Redux/Actions";
import { useSelector } from "react-redux";
import { setProfile } from "../../Redux/Actions/Profile";

const AccountLocate = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const { historyPhase } = useSelector(({ PhaseData }) => PhaseData);

  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    const user = JSON.parse(localStorage.getItem("auth_user"));

    if ("firstName" in user === false) dispatch(setProfile(userData, user._id));
    localStorage.removeItem("UserData");
  }, []);

  const startAssessment = () => {
    if (historyPhase) {
      dispatch(clearPhase1(history));
    }
    history.push("/assesment");
  };

  return (
    <>
      <Header {...props} />
      <Container
        fluid
        component="main"
        className="signinclass signinclass-block content-height"
        maxWidth="xs"
      >
        <Grid container spacing={2}>
          <Grid
            xs={12}
            lg={6}
            className="d-none d-lg-block landscape-img position-relative"
          >
            <img src={Image} alt={"B100 logo"} className="cover-img" />
            {/* <p className="overlay-text">Great !!!</p> */}
          </Grid>
          <Grid xs={12} lg={6} className="flex-center">
            <div className="middle-content get-started rightcontentdiv">
              <Typography className="page-title">
                Great, we were able to setup your profile. Let's get started!
              </Typography>

              <div className="checkbox-group get-checkbox">
                <Checkbox
                  value={termsAccepted}
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <Typography>
                  I agree to the{" "}
                  <Link href="https://b100method.com/policies/terms-of-service">
                    Terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="https://b100method.com/policies/privacy-policy">
                    privacy policy
                  </Link>
                  .
                </Typography>
              </div>
              <div className="control-btn" style={{ marginTop: "60px" }}>
                <Button
                  className="rounded-button fullbutton ml-0"
                  endIcon={<ArrowForward />}
                  onClick={startAssessment}
                  disabled={!termsAccepted}
                >
                  Take Assessment
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AccountLocate;
