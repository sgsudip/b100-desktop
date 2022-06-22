import * as React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
  },

  black: {
    color: "white",
    backgroundColor: "black",
    width: "30px",
    height: "30px",
    fontSize: "15px !important",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // marginTop:"10px",
    // margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(219, 77, 105)",
    color: "white",
    padding: "16px 24px",
    borderRadius: "100px",
    "&:hover": {
      backgroundColor: "rgb(230, 77, 105)",
    },
  },
  optionButton: {
    marginRight: "15px",
  },
  avatar: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "rgba(63, 63, 63, 0.1)",
    color: "rgb(57 57 57 / 49%)",
    cursor: "pointer",
    "&:hover": {},

    left: "auto",
    top: "auto",
    display: "inline !important",
    background: "rgb(211 211 211 / 0%) !important",
  },
  textField: {
    marginTop: "20px",
    width: "500px",
  },
  root: {
    height: 200,
    width: 200,
    marginBottom: "20px",
    marginRight: "15px",
    position: "relative",
  },
  media: {
    height: "100%",
    width: "100%",
  },
}));

function BackButton({ page, show, handleBackButtonClick }) {
  const classes = useStyles();
  return (
    <>
      {page &&
        (show ? (
          <Tooltip arrow title={""} placement="bottom-center">
            <IconButton
              className={[
                classes.button,
                "backButtonClass",
                page.landing || page.getStarted ? "topLeftCorner" : "",
                page.headerPage ? "headerQuestionBack" : "",
              ].join(" ")}
              aria-label="back"
              onClick={() => {
                handleBackButtonClick();
              }}
            >
              <ArrowBack />
              Back
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            disabled={true}
            className={[
              classes.button,
              "backButtonClass",
              page.landing || page.getStarted ? "topLeftCorner" : "",
              page.headerPage ? "headerQuestionBack" : "",
            ].join(" ")}
          >
            <ArrowBack />
            Back
          </IconButton>
        ))}
    </>
  );
}
export default BackButton;
