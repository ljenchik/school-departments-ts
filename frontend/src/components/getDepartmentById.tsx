import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDepartmentById, deleteDepartmentById } from "../apiClient";
import Container from "react-bootstrap/esm/Container";
import "../css/getDepartmentById.css";
import { Button } from "react-bootstrap";

export const GetDepartmentById = () => {
  const params = useParams();
  const department_id: string | undefined = params.id;
  const [department, setDepartment] = useState<any>({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(Number(department_id)).then((response) =>
      setDepartment(response[0])
    );
  }, []);

  if (department.created_at) {
    department.created_at = department.created_at.split("T")[0];
  }

  if (department.updated_at) {
    department.updated_at = department.updated_at.split("T")[0];
  }

  const deleteDepartment = () => {
    deleteDepartmentById(Number(department_id)).then((response) => {
      if (response.success === true) {
        navigate("/department");
      } else {
        setError("You can't delete department with employees");
      }
    });
  };

  const updateDepartment = () => {
    getDepartmentById(Number(department_id)).then((response) =>
      navigate(`/department/${department_id}/update`)
    );
  };
  return (
    <div>
      <Container>
        <div>
          <img className="department-image" src={department.image} />
          <h4>{department.department_name}</h4>
        </div>
        <br />
        <p className="info">Created on {department.created_at}</p>
        <p className="info">Updated on {department.updated_at}</p>
        <div className="d-flex flex-row">
          <div>
            <Button className="btn btn-success my-4" onClick={updateDepartment}>
              Edit
            </Button>
          </div>
          <div>
            <Button className="mx-2 my-4" onClick={deleteDepartment}>
              Delete
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
