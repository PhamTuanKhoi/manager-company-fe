import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import configAxios from "./api";
import { Provider } from "react-redux";
import store from "./redux/store";
//bootrap
import "bootstrap/dist/css/bootstrap.min.css";

window.Popper = require("popper.js").default;

configAxios();
ReactDOM.render(
   <Spinner>
      <Provider store={store}>
         <ToastContainer />
         <Main />
      </Provider>
   </Spinner>,

   document.getElementById("app")
);

if (module.hot) {
   // enables hot module replacement if plugin is installed
   module.hot.accept();
}
