import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import { listWorkerAttendanceToday } from "../../../redux/feature/workerSclice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { timeCustom } from "../../../constant";
import { Checkbox } from "antd";
import AddOvertime from "../../../_components/modelbox/AddOvertime";

const ToDayWork = () => {
   const [checked, setChecked] = useState([]);
   const [checkedAll, setCheckedAll] = useState(false);
   const [show, setShow] = useState(false);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { search } = useLocation();
   const query = new URLSearchParams(search);

   const project = query.get("project");
   const status = query.get("status");

   useEffect(() => {
      dispatch(
         listWorkerAttendanceToday({
            query: {
               project,
               status,
               year: new Date().getFullYear(),
               month: new Date().getMonth() + 1,
               date: new Date().getDate(),
            },
            setLoading,
         })
      );
   }, [project, status]);

   const { workers } = useSelector((state) => state.worker);

   // ------------------------------- checked -----------------------------------

   const handleChangeAll = (e) => {
      setCheckedAll(!checkedAll);
      setChecked(workers?.map((i) => i._id));
      if (checkedAll) {
         setChecked([]);
      }
   };

   useMemo(() => {
      if (checked?.length === workers.length && workers.length > 0) {
         setCheckedAll(true);
      }
   }, [checked, workers]);

   const handleChange = (e, item) => {
      setChecked([...checked, item._id]);

      if (!e.target.checked) {
         setCheckedAll(false);
         setChecked(checked.filter((i) => i !== item._id));
      }
   };

   console.log(checked);

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Chấm công hôm nay</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">
                        {status === "true"
                           ? "Số lượng người đi làm hôm nay"
                           : "số lượng người nghĩ hôm nay"}
                     </h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     {checked.length > 0 && (
                        <>
                           <a
                              href="#"
                              className="btn btn-danger ml-2 me-2"
                              onClick={() => setShow(true)}
                           >
                              <span>Tăng ca</span>
                           </a>
                           <a href="#" className="btn btn-warning ml-2 me-2">
                              <span>Ca gãy</span>
                           </a>
                        </>
                     )}
                  </div>
               </div>
            </div>
            {/* /Page Header */}

            <div className="row">
               <div className="col-md-12">
                  <div className="table-responsive">
                     <table className="table table-striped custom-table table-nowrap mb-0">
                        <thead>
                           <tr>
                              <th>
                                 <Checkbox onChange={handleChangeAll} checked={checkedAll} />
                              </th>
                              <th>Người lao động</th>
                              <th>Số điện thoại</th>
                              <th>Giờ vào</th>
                              <th>Giờ ra</th>
                              <th>Ngày</th>
                           </tr>
                        </thead>
                        <tbody>
                           {workers?.map((item) => (
                              <tr key={item?._id}>
                                 <td>
                                    <Checkbox
                                       checked={checked?.includes(item?._id)}
                                       onChange={(e) => handleChange(e, item)}
                                    />
                                 </td>
                                 <td>{item?.name}</td>
                                 <td>{item?.mobile}</td>
                                 <td>{timeCustom(item?.attendance?.timein || 0)}</td>
                                 <td>{timeCustom(item?.attendance?.timeout || 0)}</td>
                                 <td>{moment(item?.attendance?.datetime).format("DD/MM/YYYY")}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         {/* add overtime */}
         <AddOvertime
            show={show}
            onHide={() => setShow(false)}
            checked={checked}
            projectId={project}
         />
      </div>
   );
};

export default ToDayWork;
