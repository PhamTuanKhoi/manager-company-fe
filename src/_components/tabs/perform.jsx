import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { performTrueByIdProject } from "../../redux/feature/assignTaskSclice";
import { useLoading } from "../../hook/useLoading";
import { useSelector } from "react-redux";
const PerfromTab = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(performTrueByIdProject({ id, setLoading }));
   }, [id]);

   const { assignTaskPerformTrue } = useSelector((state) => state.assignTask);

   return (
      <div className="tab-pane" id="pending_tasks">
         <div className="m-b-30">
            <ul className="list-group notification-list">
               {assignTaskPerformTrue.map((item) => (
                  <li key={item?._id} className="list-group-item">
                     <div className="text-start">
                        {item?.name}
                        &nbsp; <span className="text-secondary">đang thực hiện công việc</span>
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

export default PerfromTab;
