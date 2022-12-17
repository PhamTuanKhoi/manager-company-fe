import React, { useEffect, useState } from "react";
import { authAPI } from "../api/auth";
import { jwtManager } from "../helpers/jwtManager";
// import { useNavigate } from "react-router-dom";

const defaultState = {
   user: undefined,
};
const Web3Context = React.createContext(defaultState);

function Web3Provider(props) {
   const [user, setUser] = useState({});
   // const navigate = useNavigate();

   useEffect(() => {
      let token = jwtManager.get();
      if (token) {
         currentuser();
      } else {
         // navigate("/login");
         console.log('navigate("/blue/login");');
      }
   }, []);

   async function currentuser() {
      try {
         const { data } = await authAPI.me();
         setUser(data);
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <Web3Context.Provider
         value={{
            user,
            setUser,
         }}
      >
         {props.children}
      </Web3Context.Provider>
   );
}
function useWeb3() {
   const context = React.useContext(Web3Context);
   if (context === undefined) {
      throw new Error("Error in useWeb3");
   }
   return context;
}

export { Web3Provider, useWeb3 };
