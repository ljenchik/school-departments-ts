import React, { useState } from "react";
import { createDepartment} from "../apiClient";
import { useNavigate } from "react-router-dom";
import "../css/createDepartment.css";
import { validateImage } from "image-validator";
import { Department } from "../models/departmentModels";
import { Menu } from "./navbarDefault";
import { Button } from "react-bootstrap";
import defaultDepartmentImage from "../images/defaultDepartmentImage.png";

const urlValidation = async (url: string) => {
  const isValidImage = await validateImage(url);
  return isValidImage;
};

const defaultImage = defaultDepartmentImage;

export const CreateDepartment = () => {
  const [department, setDepartment] = useState<Department>({
    id: null,
    department_name: "",
    image: "",
    created_at: "",
    updated_at: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeDepartmentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartment({ ...department, department_name: event.target.value });
    setError("");
  };

  const handleChangeDepartmentImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartment({ ...department, image: event.target.value });
    setError("");
  };

  const submit = async () => {
    const request: Department = {
      id: null,
      department_name: "",
      image: "",
      created_at: "",
      updated_at: "",
    };

    if (!department.department_name) {
      setError("Enter department name");
    } else {
      request.department_name = department.department_name;
    }

    if (department.image && (await urlValidation(department.image))) {
      request.image = department.image;
    } else {
      request.image = defaultImage;
    }

    createDepartment(request).then((response) => {
      if (!response.id) {
        if (
          response.error.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          setError("Department with this name already exists");
        } else {
          setError(response.error.slice(1, -1));
        }
      } else {
        navigate(`/department/${response.id}`);
      }
    });
  };

  const handleKeyPress = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  return (
    <div>
      <header> <Menu /></header>
      <main>
      <div className="create-department-container">
       
        <h4 className="title">Add a new department</h4>
        <fieldset onKeyDown={handleKeyPress}>
        
        <div className="dep-name-input">
            <label>Name</label>
            <input
                className="input-large-large search-query my-2 mb-3"
                type="text"
                style={{ width: "55%" }}
                placeholder="Enter department name"
                value={department.department_name}
                onChange={(event) => handleChangeDepartmentName(event)}
              ></input>
          </div>

          <div className="dep-name-input">
            <label>Department logo</label>
              <input
                className="input-large-large search-query my-2 mb-3"
                type="url"
                style={{ width: "55%" }}
                placeholder="http://image.jpg"
                value={department.image}
                onChange={(event) => handleChangeDepartmentImage(event)}
              ></input>
          </div>
          
          <div className="d-flex">
            <Button
              className="btn btn-success my-3"
              onKeyDown={handleKeyPress}
              onClick={submit}
            >
              Submit
            </Button>
            {error !== "" ? (
              <p className="error-message" style={{ color: "red" }}>
                {error}
              </p>
            ) : (
              ""
            )}
          </div>
        </fieldset>
        </div>
        </main>
    </div>
  );
};
