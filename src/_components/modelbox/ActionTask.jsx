import React from "react";

const ActionTask = () => {
   return (
      <>
         <span className="action-circle large" title="Assign">
            <i className="material-icons" onClick={(e) => e.stopPropagation()}>
               edit
            </i>
         </span>
         <span className="action-circle large" title="Assign">
            <i className="material-icons" onClick={(e) => e.stopPropagation()}>
               person_add
            </i>
         </span>
         <span className="action-circle large delete-btn" title="Delete Task">
            <i className="material-icons" onClick={(e) => e.stopPropagation()}>
               delete
            </i>
         </span>
      </>
   );
};

export default ActionTask;
