import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "../Pages/SignIn";
import NotFound from "../Pages/404";
import Phase1Questions from "../Pages/Phase1Questions/index";
// import Profile from "../Pages/Profile/index";
// import HomeScreen from "../Pages/Dashboard/index";
// import HeartCare from "../Pages/SignUp/HeartCare";
import HowOld from "../Pages/SignUp/HowOld";
// import Gender from "../Pages/SignUp/Gender";
import HeartCare from "../Pages/SignUp/HeartCare";
// import EmailScreen from "../Pages/SignUp/EmailScreen";
import AccountLocate from "../Pages/Dashboard/AccountLocate";

const App = (props) => {
  const { loading, testResultsReady } = useSelector(
    ({ commonData }) => commonData
  );
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("auth");

  return (
    <>
      <Switch>
        {isLoggedIn || token ? (
          <Switch>
            {/* <Route exact path={"/phases"}>
              <HomeScreen
                {...props}
                testResultsReady={testResultsReady}
                loading={loading}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route> */}
            <Route exact path={"/getstarted"}>
              <AccountLocate
                {...props}
                loading={loading}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route>
            <Route exact path={"/assesment"}>
              <Phase1Questions
                {...props}
                loading={loading}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route>

            {/* <Route exact path={"/profile"}>
              <Profile
                {...props}
                loading={loading}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route> */}

            <Redirect from="/" to="getstarted" />
            <Route path="*" component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path={"/heartcare"}>
              <HeartCare {...props} />
            </Route>
            <Route exact path={"/userinfo"}>
              <HowOld {...props} />
            </Route>
            {/* <Route exact path={"/genderinfo"}>
              <Gender {...props} />
            </Route> */}
            {/* <Route exact path={"/email"}>
              <EmailScreen {...props} />
            </Route> */}
            <Route exact path={"/signin"}>
              <SignIn
                setIsLoggedIn={setIsLoggedIn}
                {...props}
                loading={loading}
              />
            </Route>
            <Redirect from="/" to="heartcare" />
            {/* "heartcare" */}
          </Switch>
        )}
      </Switch>
    </>
  );
};

export default App;
