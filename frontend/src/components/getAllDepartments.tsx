import React, { useEffect, useState } from "react";
import { getAllDepartments } from "../apiClient";
import { Link } from "react-router-dom";
//import "./css/getAllDepartments.css";

export const GetAllDepartments = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  console.log(departments);

  useEffect(() => {
    getAllDepartments().then((response) => setDepartments(response));
  }, []);

  return (
    <div>
        <h3 className="title">Departments</h3>
          {departments.map((department) => (
            <div key={department.id}>
              <Link to={`/department/${department.id}`} className='link'>
        {" "}
        {department.department_name}{" "}
        {" "}
        {department.image}{" "}
      </Link>
            </div>
          ))}
        <br/>
        <Link to="/department/create"  className="add-link"> Add a new department </Link>
      </div>
  );
};