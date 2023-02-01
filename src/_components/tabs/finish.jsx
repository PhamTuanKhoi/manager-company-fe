import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
   finishTrueByIdProject,
   performTrueByIdProject,
} from "../../redux/feature/assignTaskSclice";
import { useLoading } from "../../hook/useLoading";
import { useSelector } from "react-redux";
const FinishTab = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(finishTrueByIdProject({ id, setLoading }));
   }, [id]);

   const { assignTaskFinishTrue } = useSelector((state) => state.assignTask);

   return (
      <div className="tab-pane" id="completed_tasks">
         <div className="m-b-30">
            <ul className="list-group notification-list">
               {assignTaskFinishTrue.map((item) => (
                  <li key={item?._id} className="list-group-item">
                     <div className="text-start text-secondary">
                        {item?.name}
                        &nbsp; <span>đã hoàn thành công việc</span>
                        &nbsp;
                        <span className="text-warning"> {item?.taskName}</span>
                     </div>
                     {/* <div className="status-toggle">{item?.taskName}</div> */}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default FinishTab;
