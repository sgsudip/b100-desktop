import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import Userprofileform from "./Form";
// const LogOut = () => {
//     setIsLoggedIn(false);
//     history.push("/");
//     localStorage.clear();
//   };

const ProfileForm = (props) => {

  return (
    <div className={["background"]}>
      <main className="maincontent">
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="Logout"
          placement="left"
        >
          <IconButton
            className="logout"
            style={{
              float: "right",
              marginRight: "10px",
              marginTop: "5px",
              position: "absolute",
              top: "0",
              right: "0",
            }}
            color="inherit"
            edge="end"
            // onClick={LogOut}
          >
            <ExitToApp />
          </IconButton>
        </Tooltip>
        <>
          <Userprofileform {...props}/>
        </>
      </main>
    </div>
  );
};

export default ProfileForm;
