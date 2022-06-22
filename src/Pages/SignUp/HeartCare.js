import React from "react";
import { Button, Typography, Grid, Container } from "@material-ui/core";
import Header from "../../Components/Header";
import Image from "../../Assets/Images/cover-img.png";
import { ArrowForward } from "@material-ui/icons";

const HeartCare = (props) => {
  const { history } = props;

  return (
    <>
      <Header />
      <Container
        fluid
        component="main"
        className="signinclass signinclass-block content-height"
        maxWidth="xs"
      >
        <Grid container spacing={2}>
          <Grid xs={12} lg={6} className="d-none d-lg-block landscape-img">
            <img src={Image} alt={"B100 logo"} className="cover-img" />
          </Grid>
          <Grid xs={12} lg={6} className="flex-center">
            <div className="middle-content rightcontentdiv">
              <Typography className="page-title page-title-md">
                You’re on your way to ultimate heart health!
              </Typography>

              <Typography className="sub-title-text">
                First , We need to verify your account
              </Typography>

              {/* <Typography className="formlabel">Enter your zip code</Typography> */}

              {/* <TextField
                variant="outlined"
                placeholder="Ex. 94102"
                className="custom-control"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                inputProps={{ maxLength: 5 }}
              /> */}

              {/* <Typography className="form-text">
                B100 us growing fast-but we're not in every state yet. Fingers
                crossed we're in yours
              </Typography> */}

              {/* <div className="checkbox-group">
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
              </div> */}
              <div className="control-btn">
                {/* <Button
                  className="rounded-button footer-back-btn"
                  endIcon={<ArrowBack />}
                /> */}
                <Button
                  // className="rounded-button fullbutton"
                  className="rounded-button"
                  endIcon={<ArrowForward />}
                  onClick={() => history.push("/userinfo")}
                >
                  {/* start verification */}
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HeartCare;
