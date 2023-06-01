import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { authAPI } from "../api/auth";
import { api } from "../constant";
import { jwtManager } from "../helpers/jwtManager";
// import { useNavigate } from "react-router-dom";

const defaultState = {
   socket: undefined,
};
const WebsocketContext = React.createContext(defaultState);

function Websocket(props) {
   const [socket, setSocket] = useState({});
   const [user, setUser] = useState({});
   const token = jwtManager.get();
   async function getUser() {
      const { data } = await authAPI.me();
      setUser(data);
   }

   useEffect(() => {
      getUser();
   }, []);
   // console.log(user);

   useEffect(() => {
      if (user._id) {
         const newSocket = io(`${api}?token=${token}`);

         // Lấy socket ID khi kết nối thành công
         newSocket.on("connect", () => {
            setSocket(newSocket);
         });

         // Đóng kết nối socket khi component unmount
         return () => {
            newSocket.disconnect();
         };
      }
   }, []);

   return (
      <WebsocketContext.Provider
         value={{
            socket,
            setSocket,
         }}
      >
         {props.children}
      </WebsocketContext.Provider>
   );
}
function useSocket() {
   const context = React.useContext(WebsocketContext);
   if (context === undefined) {
      throw new Error("Error in useSocket");
   }
   return context;
}

export { Websocket, useSocket };
