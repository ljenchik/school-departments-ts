import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getDepartmentById
} from "../apiClient";
import Container from "react-bootstrap/esm/Container";
import "../css/getDepartmentById.css";

export const GetDepartmentById = () => {
  const params = useParams();
  const id: string | undefined = params.id;
  const [department, setDepartment] = useState<any>({});
  
  useEffect(() => {
    getDepartmentById(Number(id)).then((response) =>
      setDepartment(response[0])
    );
  }, []);

  if (department.created_at) {
    department.created_at = department.created_at.split('T')[0];
  }

  if (department.updated_at) {
    department.updated_at = department.updated_at.split('T')[0];
  }


    return (
      <div>
        <Container>
          <div>
          <img className="department-image" src={department.image} />
          <h4 className="title">{department.department_name}</h4>
          </div>
          <br/>
          Created on {department.created_at}
          <br/>
          Updated on {department.updated_at}
        </Container>
      </div>
    );
};

