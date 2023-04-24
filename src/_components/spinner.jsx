import React, { useState } from "react";
import { Space, Spin } from "antd";
import { loadingContext } from "../context/loadingContext";
import Modal from "react-bootstrap/Modal";
export default function Spinner({ children }) {
   const [loading, setLoading] = useState(false);

   const container = {
      width: "100%",
      height: "100%",
      position: "fixed",
      backgroundColor: "#34444c",
      zIndex: "900",
      // display: loading ? "" : "none",
   };

   return (
      <loadingContext.Provider
         value={{
            loading,
            setLoading,
         }}
      >
         {/* <Modal
            show={loading}
            centered
            style={{
               width: "100%",
               display: "flex",
               justifyContent: "center",
               height: "100%",
               backgroundColor: "#fff",
               border: "0 none",
               borderTop: "0 none",
               zIndex: "900",
            }}
         >
            <Spin tip="Loading" size="large"></Spin>
         </Modal> */}
         <div className={`${loading ? "show-content" : "hiden-content"} `} style={{ ...container }}>
            <div class="lds-hourglass-position text-center">
               <div class="lds-grid">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
               </div>
            </div>
         </div>
         {children}
      </loadingContext.Provider>
   );
}
