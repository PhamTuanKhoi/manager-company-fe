import React, { memo } from "react";
import { Link } from "react-router-dom";
import { timeCustom } from "../../constant";
import { Checkbox } from "antd";
import { useState } from "react";

const Tableavatar = ({ dateInMonth, allUserAttendance, checked, setChecked, setCheckedAll }) => {
   // ------------------------------ get user attendance ---------------------------

   let array = new Set();

   const handleChange = (e, item) => {
      setChecked([...checked, item._id]);

      if (!e.target.checked) {
         setChecked(checked.filter((i) => i !== item._id));
      }
   };

   return (
      <>
         {allUserAttendance.items?.map((item) => {
            return (
               <tr key={item._id}>
                  <td>
                     <Checkbox
                        checked={checked.includes(item._id)}
                        onChange={(e) => handleChange(e, item)}
                     />
                     <Link to={`/app/profile/worker-profile/${item?._id}`}>
                        <span className="ms-3 text-dark">{item?.name}</span>
                     </Link>
                  </td>

                  {/* Tableavatar */}
                  {item.attendance.length > 0
                     ? item.attendance.map((val, index) => {
                          if (val?.date === 1) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 2) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 3) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 4) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 5) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 6) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 7) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 8) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 9) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 10) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 11) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 12) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 13) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 14) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 15) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 16) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 17) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 18) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 19) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 20) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 21) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 22) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }

                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 23) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }
                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 24) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }
                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 25) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }
                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 26) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }
                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 27) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }
                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }
                          if (val?.date === 28) {
                             if (!array.has(val?.date + item._id)) {
                                array.add(val?.date + item._id);
                                return <Td key={index} val={val} index={index} />;
                             }
                             if (array.has(val?.date + item._id)) {
                                if (val.timein > 0) {
                                   return <Td key={index} val={val} index={index} />;
                                }
                             }
                          }

                          if (item?.attendance.length >= 29) {
                             if (val?.date === 29) {
                                if (!array.has(val?.date + item._id)) {
                                   array.add(val?.date + item._id);
                                   return <Td key={index} val={val} index={index} />;
                                }
                                if (array.has(val?.date + item._id)) {
                                   if (val.timein > 0) {
                                      return <Td key={index} val={val} index={index} />;
                                   }
                                }
                             }
                          }

                          if (item?.attendance.length >= 30) {
                             if (val?.date === 30) {
                                if (!array.has(val?.date + item._id)) {
                                   array.add(val?.date + item._id);
                                   return <Td key={index} val={val} index={index} />;
                                }
                                if (array.has(val?.date + item._id)) {
                                   if (val.timein > 0) {
                                      return <Td key={index} val={val} index={index} />;
                                   }
                                }
                             }

                             if (item?.attendance.length >= 31) {
                                if (val?.date === 31) {
                                   if (!array.has(val?.date + item._id)) {
                                      array.add(val?.date + item._id);
                                      return <Td key={index} val={val} index={index} />;
                                   }
                                   if (array.has(val?.date + item._id)) {
                                      if (val.timein > 0) {
                                         return <Td key={index} val={val} index={index} />;
                                      }
                                   }
                                }
                             }
                          }
                       })
                     : dateInMonth?.map((val, index) => (
                          <td key={index}>
                             <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                                <i className="fa fa-close text-danger" />
                             </a>
                          </td>
                       ))}

                  <td>dccd</td>
               </tr>
            );
         })}

         {/* /Tableavatar */}
      </>
   );
};

function Td({ val }) {
   return (
      <td>
         <a href="#" className="fw-bold" data-bs-toggle="modal" data-bs-target="#attendance_info">
            {val?.status === "redundant" ? (
               <span className="text-info">{timeCustom(val?.workHour)}</span>
            ) : val.status === "lack" ? (
               <span className="underline-red">{timeCustom(val?.workHour)}</span>
            ) : val.status === "enough" ? (
               <span className="">{timeCustom(val?.workHour)}</span>
            ) : val.timein > 0 && val.timeout === 0 ? (
               <span>o</span>
            ) : (
               <i className="fa fa-close text-danger" />
            )}
         </a>
      </td>
   );
}

export default memo(Tableavatar);
