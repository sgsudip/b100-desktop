// import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Card,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Checkbox,
//   Avatar,
//   Typography,
//   Button,
//   Tooltip,
//   IconButton,
//   Link,
// } from "@material-ui/core";
// import BackgroundPhaseImage from "../../Assets/Images/background-phase.png";
// import HistoryPhase from "../../Assets/Images/historyPhase.png";
// // import GeneticsPhase from "../../Assets/Images/GeneticsPhase.png";
// // import ChoicesPhase from "../../Assets/Images/ChoicesPhase.png";
// // import PlaqueB100 from "../../Assets/Images/PlaqueB100.png";
// import {
//   fillInfo,
//   clearPhase1,
//   // getScore,
// } from "../../Redux/Actions/QuestionsList";
// import {
//   ExitToApp,
//   RadioButtonCheckedRounded,
//   CheckCircleRounded,
//   ArrowForwardIos,
// } from "@material-ui/icons";
// import CustomModal from "../../Components/CustomModal";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 460,
//     padding: "10px",
//     backgroundColor: theme.palette.background.paper,
//     overflowY: "auto",
//   },
//   listItem: {
//     padding: "5px 0",
//     // fontFamily: "MultiFonts !important",
//   },
//   avatarContainer: {
//     padding: "10px",
//   },
//   avatarImage: {
//     objectFit: "none",
//   },
//   blurAvatarImage: {
//     objectFit: "none",
//     filter: "blur(0.5px)",
//   },
//   roundedCheckBox: {
//     borderRadius: "50px",
//     // background:"white !important",
//     // color: "#ff4c6e",
//     // '&$checked': {
//     //   color: "#c0c0c0 !important",
//     // },
//   },
//   notCompletedColor: {
//     color: "rgb(0 0 0 / 26%) !important",
//   },
//   CompletedColor: {
//     color: "black !important",
//   },
//   nextStepText: {
//     color: "#ff4c6e !important",
//     marginRight: "10px",
//     fontSize: "14px",
//     fontFamily: "MultiFonts !important",
//   },
// }));

// export default function HomeScreen(props) {
//   const classes = useStyles();
//   const { setIsLoggedIn, history, testResultsReady } = props;
//   const dispatch = useDispatch();
//   let { authUser } = useSelector(
//     ({ authenticationData }) => authenticationData
//   );
//   let {
//     backgroundPhase,
//     historyPhase,
//     choicesPhase,
//     geneticsPhase,
//     plaquePhase,
//     bluePrint,
//   } = useSelector(({ PhaseData }) => PhaseData);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const LogOut = () => {
//     setIsLoggedIn(false);
//     history.push("/");
//     localStorage.clear();
//   };
//   useEffect(() => {
//     if (!authUser) {
//       dispatch(fillInfo());
//     }
//     // if (historyPhase) {
//     //   dispatch(getScore());
//     // }
//   }, [authUser, dispatch]);

//   /* useEffect(() => {
//     if (historyPhase) {
//       dispatch(getScore());
//     }
//   }, [historyPhase]); */

//   let nextPhase = 0;
//   const lastDoneIndex = [
//     backgroundPhase,
//     historyPhase,
//     choicesPhase,
//     geneticsPhase,
//     plaquePhase,
//     bluePrint,
//   ].lastIndexOf(true);
//   if (lastDoneIndex >= 0) {
//     nextPhase = lastDoneIndex + 1;
//   }

//   return (
//     <div className={"background"}>
//       <div className={["maincontent"].join(" ")}>
//         <Tooltip arrow title="Logout" placement="left">
//           <IconButton
//             className="logout"
//             style={{
//               float: "right",
//               marginRight: "10px",
//               marginTop: "5px",
//               position: "absolute",
//               // left: "28%",
//               top: "0",
//               right: "0",
//             }}
//             color="inherit"
//             edge="end"
//             onClick={LogOut}
//           >
//             <ExitToApp />
//           </IconButton>
//         </Tooltip>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "calc(100vh - 200px)",
//             // height: "100vh",
//           }}
//         >
//           {testResultsReady && (
//             <Card className={classes.root} style={{ marginBottom: "10px" }}>
//               <List dense>
//                 <ListItem button className={classes.listItem}>
//                   <Typography>
//                     Good news! Your LubDub® grade is ready.
//                     <Link
//                       href="https://apps.apple.com/us/app/b100-method/id1522973838"
//                       underline="hover"
//                       target="_blank"
//                       // rel='noreferrer'
//                     >
//                       Click here
//                     </Link>{" "}
//                     to download the B100 Method App to instantly view your grade
//                     and heart health recommendations.
//                   </Typography>
//                 </ListItem>
//               </List>
//             </Card>
//           )}
//           <Card className={classes.root}>
//             <List dense>
//               {[
//                 // {
//                 //   key: 1,
//                 //   src: BackgroundPhaseImage,
//                 //   name: "Profile",
//                 // },
//                 // { key: 2, src: HistoryPhase, name: "History" },
//                 { key: 2, src: HistoryPhase, name: "Assesment" },
//                 /* { key: 3, src: ChoicesPhase, name: "Home Test" },
//                 { key: 4, src: GeneticsPhase, name: "Genetics" },
//                 { key: 5, src: PlaqueB100, name: "Plaque" },
//                 { key: 6, src: PlaqueB100, name: "BluePrint" }, */
//               ].map((value, index) => {
//                 const labelId = `checkbox-list-secondary-label-${value.key}`;
//                 return (
//                   <ListItem
//                     onClick={() => {
//                       if (index === 0 && historyPhase) {
//                         setOpenConfirm(true);
//                       } else if (index === 0) {
//                         props.history.push("/assesment");
//                       } /* else if (index === 0) {
//                         props.history.push("/profile");
//                       } */
//                     }}
//                     key={value.key}
//                     button
//                     className={classes.listItem}
//                     disabled={!(index <= nextPhase)}
//                   >
//                     <Checkbox
//                       disableRipple
//                       icon={<RadioButtonCheckedRounded fontSize="large" />}
//                       checkedIcon={<CheckCircleRounded fontSize="large" />}
//                       edge="end"
//                       checked={index < nextPhase ? true : false}
//                       className={classes.roundedCheckBox}
//                       style={{
//                         color:
//                           index < nextPhase
//                             ? "#ff4c6e !important"
//                             : "rgb(0 0 0 / 26%) !important",
//                       }}
//                     />
//                     <ListItemAvatar className={classes.avatarContainer}>
//                       <Avatar
//                         classes={{ img: classes.avatarImage }}
//                         alt={`BackgroundPhaseImage`}
//                         src={value.src}
//                       />
//                     </ListItemAvatar>
//                     <ListItemText
//                       id={labelId}
//                       primary={`${value.name}`}
//                       classes={{ primary: "fontMuli" }}
//                     />
//                     {index === nextPhase && (
//                       <Typography
//                         className={classes.nextStepText}
//                         component="span"
//                       >
//                         Next Step
//                       </Typography>
//                     )}

//                     <ArrowForwardIos
//                       style={{
//                         marginRight: "5px",
//                       }}
//                     />
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Card>
//           <CustomModal
//             openDeleteAlert={openConfirm}
//             handleClose={() => {
//               setOpenConfirm(false);
//             }}
//             dialogTitle={"Warning!"}
//             dialogContent={
//               "This will override your test results, " +
//               "and new results will not be available until we reevaluate your new answers. is this okay?"
//             }
//             dialogActions={
//               <>
//                 <Button
//                   variant="contained"
//                   onClick={() => {
//                     setOpenConfirm(false);
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={async () => {
//                     if (historyPhase) {
//                       dispatch(clearPhase1(history));
//                     }
//                     props.history.push("/assesment");
//                   }}
//                 >
//                   Ok
//                 </Button>
//               </>
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import Header from "../../Components/Header";
// import CircularProgressWithLabel from "../../Components/CircularProgressWithLabel/Index";
import { useDispatch } from "react-redux";
import { getProfile, setProfile } from "../../Redux/Actions/Profile";
import { useSelector } from "react-redux";
import { fillInfo } from "../../Redux/Actions";

const HomeScreen = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.profileData);
  const { authUser } = useSelector(
    ({ authenticationData }) => authenticationData
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    dispatch(getProfile());
    if (!authUser) {
      dispatch(fillInfo());
    }
  }, [authUser]);

  useEffect(() => {
    setFirstName(users.firstName);
    setLastName(users.lastName);
  }, [users]);

  const movetoNext = () => {
    const DOB = localStorage.getItem("DOB");
    const Gender = localStorage.getItem("Gender");
    let user = localStorage.getItem("auth_user");
    if (user) user = JSON.parse(user);
    if (DOB && Gender && user) {
      const req = {
        firstName: firstName,
        lastName: lastName,
        dob: DOB,
        sex: Gender,
      };
      dispatch(setProfile(req, user._id));
      // history.push("/assesment");
      history.push("/getstarted");
    } else {
      const req = {
        firstName: firstName,
        lastName: lastName,
      };
      dispatch(setProfile(req, user._id));
      // history.push("/assesment");
      history.push("/getstarted");
    }
  };

  return (
    <div className="background container-bg">
      <main className="maincontent">
        <>
          <Header {...props} />
          {/* <div className="progressbarContainer">
            <CircularProgressWithLabel
              thickness="4"
              className="circularProgress"
              variant="determinate"
              style={{
                // color: "rgba(63, 63, 63, 0.8)",
                color: "rgba(255, 76, 110, 1)",
              }}
              value={0}
            />
          </div> */}

          <Box className="animationContainer">
            <Button
              type="submit"
              variant="contained"
              className="phases-back-btn"
              startIcon={<ArrowBack />}
              // onClick={() => history.push("/genderinfo")}
            >
              Back
            </Button>
            <div>
              <Typography className="Type-headingText text-center">
                Let's get started! What's your legal name?
              </Typography>
              {/* <Typography className="descriptionText text-center">
                Because this is real prescription, we need to know whose name to
                put on the bottle.
              </Typography> */}
              <Grid container spacing={2} className="col-lg-10 mx-auto mt-md-3">
                <Grid xs={12} sm={6} className="pr-sm-2 mb-3">
                  <Typography>Patient's legal first name</Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Jane"
                    className="custom-input-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={6} className="pl-sm-2 mb-3">
                  <Typography>Patient's legal last name</Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Doe"
                    className="custom-input-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                className="rounded-button circle-btn"
                endIcon={<ArrowForward />}
                disabled={!firstName && !lastName}
                onClick={() => movetoNext()}
              />
            </div>
          </Box>
        </>
      </main>
    </div>
  );
};

export default HomeScreen;
