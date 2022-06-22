import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import Header from "../../Components/Header";
import Image from "../../Assets/Images/cover-img.png";
import { ArrowBack, ArrowForwardIos } from "@material-ui/icons";

const EmailScreen = (props) => {
  const { history } = props;

  const [email, setEmail] = useState("");

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
          onClick={() => history.push("/genderinfo")}
        >
          Back
        </Button>
        <Grid container spacing={2}>
          <Grid xs={12} lg={6} className="d-none d-lg-block landscape-img">
            <img src={Image} alt={"B100 logo"} className="cover-img" />
          </Grid>
          <Grid xs={12} lg={6} className="flex-center">
            <div className="middle-content rightcontentdiv">
              <Typography className="page-title page-title-md mb-4">
                What E-mail Address did you used with a purchase?
              </Typography>

              <TextField
                variant="outlined"
                placeholder="E-mail Address"
                className="custom-control email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                // inputProps={{ maxLength: 5 }}
              />

              <div className="control-btn">
                <Button
                  className="rounded-button fullbutton"
                  endIcon={<ArrowForwardIos />}
                  disabled={!email}
                  onClick={() => history.push("/signin")}
                >
                  Next
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EmailScreen;
