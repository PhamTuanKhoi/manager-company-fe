import React, { useState } from "react";
import AssignPerson from "./AssignPerson";

const ActionTask = ({ item }) => {
   const [modalPerson, setModalPerson] = useState(false);
   const [load, setLoad] = useState(0);

   const handlePerson = (e) => {
      e.stopPropagation();
      setModalPerson(true);
      setLoad((prev) => prev + 1);
   };
   return (
      <>
         <span className="action-circle large" title="Assign">
            <i className="material-icons" onClick={(e) => e.stopPropagation()}>
               edit
            </i>
         </span>
         <span className="action-circle large" title="Assign">
            <i className="material-icons" onClick={handlePerson}>
               person_add
            </i>
         </span>
         <span className="action-circle large delete-btn" title="Delete Task">
            <i className="material-icons" onClick={(e) => e.stopPropagation()}>
               delete
            </i>
         </span>

         <AssignPerson
            show={modalPerson}
            onHide={() => setModalPerson(false)}
            task={item}
            load={load}
         />
      </>
   );
};

export default ActionTask;
