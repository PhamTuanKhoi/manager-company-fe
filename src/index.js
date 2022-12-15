import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import configAxios from "./api";
import { Web3Provider } from "./context/useUser";
window.Popper = require("popper.js").default;

configAxios();
ReactDOM.render(
   <Web3Provider>
      <ToastContainer />
      <Main />
   </Web3Provider>,
   document.getElementById("app")
);

if (module.hot) {
   // enables hot module replacement if plugin is installed
   module.hot.accept();
}
