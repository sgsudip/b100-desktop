import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Loader from "../../Components/Loader";
import ProfileForm from "./Profile";
import QuestionAppHeader from "../../Components/Header/index";
import { getProfile } from "../../Redux/Actions/Profile";

const Profile = (props) => {
  const dispatch = useDispatch();
  const { setIsLoggedIn } = props;
  // const initProgress = Number(localStorage.getItem("progress"));
  // const [progress, setProgress] = React.useState(
  //   initProgress ? initProgress : 0
  // );


  let { authUser } = useSelector(
    ({ authenticationData }) => authenticationData
  );
  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      dispatch(getProfile())
    }
  }, [setIsLoggedIn, authUser, dispatch]);

  // const LogOut = () => {
  //   setIsLoggedIn(false);
  //   history.push("/");
  //   localStorage.clear();
  // };


  // const initLocalState = localStorage.getItem("localState")
  //   ? JSON.parse(localStorage.getItem("localState"))
  //   : null;
  return (
    <>
      {/* {!initLocalState && (loading || !phoneNumber) ? (
        <div className={"background"}>
          <Loader />
        </div>
      ) : (
        <> */}
      <QuestionAppHeader {...props} />
      <ProfileForm {...props} />
      {/* </>
      )} */}
    </>
  );
};

export default Profile;
