import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import configAxios from "./api";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
//bootrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Websocket } from "./context/useSocket";
import Spinner from "../src/_components/spinner";
import { PersistGate } from "redux-persist/integration/react";

window.Popper = require("popper.js").default;

configAxios();
ReactDOM.render(
   <Websocket>
      <Provider store={store}>
         <Spinner>
            <ToastContainer />
            <PersistGate loading={null} persistor={persistor}>
               <Main />
            </PersistGate>
         </Spinner>
      </Provider>
   </Websocket>,
   document.getElementById("app")
);

if (module.hot) {
   // enables hot module replacement if plugin is installed
   module.hot.accept();
}
