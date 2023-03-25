import React, { memo, useMemo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { timeCustom } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { sumWorkHourInMonthOfWorker } from "../../redux/feature/workerSclice";
const Tableavatar = ({ dateInMonth, allUserAttendance }) => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { id } = useParams();

   useEffect(() => {
      dispatch(
         sumWorkHourInMonthOfWorker({
            query: {
               project: id,
               year: new Date().getFullYear(),
               month: new Date().getMonth() + 1,
            },
            setLoading,
         })
      );
   }, []);
   const { sumWorkHourInMonth } = useSelector((state) => state.worker);

   console.log({ sumWorkHourInMonth });
   return (
      <>
         {allUserAttendance.items?.map((item) => {
            return (
               <tr key={item._id}>
                  <td>
                     <Link to={`/app/profile/worker-profile/${item?._id}`}>
                        <span className="ms-3 text-dark">{item?.name}</span>
                     </Link>
                  </td>

                  {/* Tableavatar */}
                  {item.attendance.length > 0
                     ? item.attendance.map((val, index) => (
                          <td key={index}>
                             <a
                                href="#"
                                className="fw-bold"
                                data-bs-toggle="modal"
                                data-bs-target="#attendance_info"
                             >
                                {val.status === false && val.workhour > 0 ? (
                                   <span className="text-warning">{timeCustom(val?.workhour)}</span>
                                ) : val.status === true && val.workhour > 0 ? (
                                   <span className="">{timeCustom(val?.workhour)}</span>
                                ) : val.workhour < 0 ? (
                                   <i className="fa fa-close text-danger" />
                                ) : (
                                   <i className="fa fa-close text-secondary" />
                                )}
                             </a>
                          </td>
                       ))
                     : dateInMonth?.map((val, index) => (
                          <td key={index}>
                             <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                                <i className="fa fa-close text-secondary" />
                             </a>
                          </td>
                       ))}

                  {sumWorkHourInMonth?.map(
                     (sum) =>
                        sum?._id === item?._id && (
                           <td className="text-center bg-success text-light fw-bold">
                              {sum?.ratioWork || 0}
                           </td>
                        )
                  )}
                  {sumWorkHourInMonth?.map(
                     (sum) =>
                        sum?._id === item?._id && (
                           <td className="text-center text-primary fw-bold">
                              {timeCustom(sum?.totalShifts) || 0}
                           </td>
                        )
                  )}
                  {sumWorkHourInMonth?.map(
                     (sum) =>
                        sum?._id === item?._id && (
                           <td className="text-center text-primary fw-bold">
                              {timeCustom(sum?.totalOvertimeMorning) || 0}
                           </td>
                        )
                  )}
                  {sumWorkHourInMonth?.map(
                     (sum) =>
                        sum?._id === item?._id && (
                           <td className="text-center text-primary fw-bold">
                              {timeCustom(sum?.totalOvertimeEverming) || 0}
                           </td>
                        )
                  )}
               </tr>
            );
         })}

         {/* /Tableavatar */}
      </>
   );
};

export default memo(Tableavatar);
