import { Table } from "antd";
import React, { useState } from "react";
import { itemRender, onShowSizeChange } from "../../MainPage/paginationfunction";

const AssignTask = () => {
   const [data, setData] = useState([
      { id: 1, leavetype: "Medical Leave", leavedays: "12 days" },
      { id: 2, leavetype: "Loss of Pay", leavedays: "-" },
      { id: 3, leavetype: "Casual Leave", leavedays: "12 days" },
   ]);

   const columns = [
      {
         title: "#",
         dataIndex: "id",
      },
      {
         title: "Leave Type",
         dataIndex: "leavetype",
         sorter: (a, b) => a.leavetype.length - b.leavetype.length,
      },

      {
         title: "Leave Days",
         dataIndex: "leavedays",
         sorter: (a, b) => a.leavedays.length - b.leavedays.length,
      },
      {
         title: "Status",
         render: (text, record) => (
            <div className="dropdown action-label">
               <a
                  className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  <i className="fa fa-dot-circle-o text-success" /> Active
               </a>
               <div className="dropdown-menu dropdown-menu-right">
                  <a href="#" className="dropdown-item">
                     <i className="fa fa-dot-circle-o text-success" /> Active
                  </a>
                  <a href="#" className="dropdown-item">
                     <i className="fa fa-dot-circle-o text-danger" /> Inactive
                  </a>
               </div>
            </div>
         ),
      },
   ];

   return (
      <div className="card">
         <div className="card-body">
            <h5 className="card-title m-b-20">Công việc được giao</h5>

            <div className="table-responsive">
               <Table
                  pagination={{
                     total: data.length,
                     showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                     showSizeChanger: true,
                     onShowSizeChange: onShowSizeChange,
                     itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  bordered
                  dataSource={data}
                  rowKey={(record) => record.id}
                  // onChange={this.handleTableChange}
               />
            </div>
         </div>
      </div>
   );
};

export default AssignTask;
