import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getDepartmentById, updateDepartment } from "../apiClient";
import Container from "react-bootstrap/esm/Container";
import { UpdateDepartmentForm } from "../requestModels/departmentModels";
import "../css/updateDepartment.css";

export const UpdateDepartment = () => {
  const params = useParams();
  const department_id: string | undefined = params.id;
  const [department, setDepartment] = useState<UpdateDepartmentForm>({
    department_name: "",
    image: "",
    updated_at: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(Number(department_id)).then((response) => {
      setDepartment(response[0]);
    });
  }, []);

  const handleChangeDepartmentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartment({ ...department, department_name: event.target.value });
  };

  const handleChangeDepartmentImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartment({ ...department, image: event.target.value });
  };

  const submit = () => {
    const request: UpdateDepartmentForm = {
      department_name: "",
      image: "",
      updated_at: "",
    };
    request.department_name = department.department_name;
    request.image = department.image;
    request.updated_at = new Date().toISOString();
    updateDepartment(Number(department_id), request).then((response) => {
      navigate(`/department/${department_id}`);
    });
  };

  const handleKeyPress = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  if (department === undefined) {
    return <div>Loading report ...</div>;
  } else {
    return (
      <Container>
        <img className="department-image" src={department.image}/><br />
        <h4 className="update-department-title">{department.department_name}</h4>
        <label>Update department name</label>
        <br />
        <input
          className="department-data-input"
          type="text"
          value={department.department_name}
          onChange={(event) => handleChangeDepartmentName(event)}
        ></input>
        <br />
        <label>Update department logo</label>
        <br />
        <input
          className="department-data-input"
          type="url"
          value={department.image}
          onChange={(event) => handleChangeDepartmentImage(event)}
        ></input>
        <br />

        <Button
          className="my-3"
          onKeyDown={handleKeyPress}
          onClick={submit}
        >
          Save
        </Button>
        <br/>
        <Link to="/" className="link">
          View all departments
        </Link>
      </Container>
    );
  }
};
