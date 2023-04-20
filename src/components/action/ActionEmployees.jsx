import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../hook/useLoading";
import { listDepartment } from "../../redux/feature/departmentSclice";

function ActionEmployees({ department, setDepartment }) {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const { departments } = useSelector((state) => state.department);

   useEffect(() => {
      dispatch(listDepartment({ setLoading }));
   }, []);
   return (
      <div className="col-sm-6 col-md-3">
         <div className="form-group form-focus select-focus">
            <select
               className="form-control floating"
               value={department}
               onChange={(e) => setDepartment(e.target.value)}
            >
               <option value={""}>Tất cả</option>
               {departments?.map((item) => (
                  <option key={item?._id} value={item?._id}>
                     {item?.name}
                  </option>
               ))}
            </select>
            <label className="focus-label">Vị trí</label>
         </div>
      </div>
   );
}

export default memo(ActionEmployees);
