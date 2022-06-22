import "react-toastify/dist/ReactToastify.css";
import React from "react";
import App from "./Containers/App";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import configureStore, { history } from "./Redux/Store";

const store = configureStore();

const MainApp = () => {
  console.log(store);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
        <ToastContainer limit={3} autoClose={3000} pauseOnFocusLoss={false} />
      </ConnectedRouter>
    </Provider>
  );
};

export default MainApp;
