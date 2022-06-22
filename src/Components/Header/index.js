import React from "react";
import {
  AppBar,
  // Button,
  // Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
// import logoImage from "../../Assets/Images/logo.png";
import logoImage from "../../Assets/Images/b-100-white.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "rgba(63, 63, 63, 0.1)",
    color: "rgb(57 57 57 / 49%)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(219, 77, 105)",
      color: "white",
      cursor: "pointer",
    },
    float: "left",
    position: "absolute",
    left: 280,
    top: 25,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#ff4c6e",
    // backgroundColor: "#fff",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { open, setIsLoggedIn, history } = props;

  const LogOut = () => {
    setIsLoggedIn(false);
    history.push("/");
    localStorage.clear();
  };

  const token = localStorage.getItem("auth");

  return (
    <>
      <AppBar
        position="fixed"
        style={{ height: "75px" }}
        className={[
          clsx(classes.appBar, open && classes.appBarShift),
          "appHeader",
        ].join(" ")}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            width: "100%",
            paddingLeft: 20,
            margin: "0 auto",
            // paddingRight:"18vw"
          }}
        >
          <div className="d-flex">
            <img
              alt="logo"
              style={{ height: "60px" }}
              src={logoImage}
              className="header-logo"
            />
          </div>
          {/* <Tooltip arrow title={title} placement="left">
            <Typography
              variant="h5"
              noWrap
              className="headerTitle"
            >
              {title}
            </Typography>
          </Tooltip>
          <Tooltip arrow title={subTitle} placement="left">
            <Typography
              noWrap
              className="headerSubTitle"
            >
              {subTitle}
            </Typography>
          </Tooltip> */}
        </div>
        {token !== null ? (
          <Tooltip arrow title="Logout" placement="left">
            <IconButton
              className="logout logout-icon"
              style={{
                // float: "right",
                // right: "0",
                // position: "absolute",
                color: "rgb(57, 57, 57)",
                marginRight: "40px",
                // marginTop:"5px",
                // top: "0",
              }}
              color="inherit"
              edge="end"
              onClick={LogOut}
            >
              <ExitToApp />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip arrow title="Log in" placement="left">
            <IconButton
              className="logout"
              style={{
                // float: "right",
                // right: "0",
                // position: "absolute",
                color: "rgb(57, 57, 57)",
                marginRight: "40px",
                // marginTop:"5px",
                // top: "0",
              }}
              color="inherit"
              onClick={() => (window.location.href = "/signin")}
            >
              Log in
            </IconButton>
          </Tooltip>
        )}
      </AppBar>
    </>
  );
};

export default Header;
