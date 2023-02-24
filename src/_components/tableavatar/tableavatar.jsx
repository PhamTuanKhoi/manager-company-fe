import React from "react";
import { Link } from "react-router-dom";
import { Avatar_04 } from "../../Entryfile/imagepath";

const Tableavatar = () => {
   // ------------------------------ get user attendance ---------------------------
   const days = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28,
   ];

   const arr = [
      {
         name: "pham tuan",
         status: "o",
         day: 1,
      },
      {
         name: "pham tuan",
         status: "y",
         day: 2,
      },
      {
         name: "diem my",
         status: "x",
         day: 11,
      },
      {
         name: "diem my",
         status: "o",
         day: 1,
      },
      {
         name: "diem my",
         status: "y",
         day: 2,
      },
      {
         name: "diem my",
         status: "x",
         day: 7,
      },
   ];
   // arr.sort((a, b) => a.day - b.day);

   // const cus = [...arr, ...days];
   // const listDay = arr.map((item) => item.day);
   // const uniqueArray = [...new Set(listDay)];
   // let result = cus;
   // uniqueArray.some((r) => {
   //    if (cus.includes(r)) {
   //       let a = cus.indexOf(r);
   //       // result = result.filter((i) => i !== cus[a]);
   //       arr.map((obj) => {
   //          if (obj.day === result[a]) {
   //             // result[a - 1] = obj;
   //             result[a] = obj;
   //          }
   //       });
   //    }
   // });

   // let data = result.slice(arr.length, result.length);

   // // let ins = data?.splice(2, 0, "Lene");
   // let orther = [];
   // arr.map((obj) => {
   //    if (!data.includes(obj)) {
   //       orther.push(obj);
   //    }
   // });

   // let Cdun = [];
   // data.map((item) => {
   //    orther.map((val) => {
   //       if (item.day === val.day) {
   //          var a = data.indexOf(item);
   //          console.log(item);
   //          let v = data.splice(a, 0, val);
   //       }
   //    });
   // });
   // console.log(Cdun);

   // console.log(ins);

   const users = [
      {
         name: "pham tuan",
         attendance: [
            { day: 1, status: "true" },
            { day: 2, status: "false" },
         ],
      },
      {
         name: "diem my",
         attendance: [
            { day: 3, status: "false" },
            { day: 4, status: "false" },
            { day: 5, status: "false" },
         ],
      },
   ];
   return (
      <>
         {/* {users.map((item) => (
            <tr key={item.name}>
               <td>
                  <h2 className="table-avatar">
                     <Link className="avatar avatar-xs" to="/app/profile/employee-profile">
                        <img alt="" src={Avatar_04} />
                     </Link>
                     <Link to="/app/profile/employee-profile">{item.name}</Link>
                  </h2>
               </td>

               {item.attendance.map((val) => (
                  <td key={val}>
                     {console.log(val.status)}
                     <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                        {val?.status}
                     </a>
                  </td>
               ))}
            </tr>
         ))} */}
         {/* Tableavatar */}
         {/* {users.map((item) => (
            <tr key={item.name}>
               <td>
                  <h2 className="table-avatar">
                     <Link className="avatar avatar-xs" to="/app/profile/employee-profile">
                        <img alt="" src={Avatar_04} />
                     </Link>
                     <Link to="/app/profile/employee-profile">{item.name}</Link>
                  </h2>
               </td>

               {data.map((val) =>
                  val.name === item.name ? (
                     <td key={val}>
                        <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                           {val?.name}
                        </a>
                     </td>
                  ) : (
                     <td key={val}>
                        <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                           x
                        </a>
                     </td>
                  )
               )}
            </tr>
         ))} */}
         <tr>
            <td>
               <h2 className="table-avatar">
                  <Link className="avatar avatar-xs" to="/app/profile/employee-profile">
                     <img alt="" src={Avatar_04} />
                  </Link>
                  <Link to="/app/profile/employee-profile">Loren Gatlin</Link>
               </h2>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <i className="fa fa-close text-danger" />{" "}
            </td>
            <td>
               <i className="fa fa-close text-danger" />{" "}
            </td>
            <td>
               <i className="fa fa-close text-danger" />{" "}
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <i className="fa fa-close text-danger" />{" "}
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <i className="fa fa-close text-danger" />{" "}
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <i className="fa fa-close text-danger" />{" "}
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
            <td>
               <a href="" data-bs-toggle="modal" data-bs-target="#attendance_info">
                  <i className="fa fa-check text-success" />
               </a>
            </td>
         </tr>
         {/* /Tableavatar */}
      </>
   );
};

export default Tableavatar;
