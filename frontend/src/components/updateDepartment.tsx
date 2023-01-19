import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getDepartmentById, updateDepartment } from "../apiClient";
import Container from "react-bootstrap/esm/Container";
import { UpdateDepartmentForm } from "../models/departmentModels";
import "../css/updateDepartment.css";
import { validateImage } from "image-validator";
import defaultDepartmentImage from "../images/defaultDepartmentImage.png";
import { MenuDepartment } from "./navbarGetDepartmentById";

const urlValidation = async (url: string) => {
  const isValidImage = await validateImage(url);
  return isValidImage;
};

const defaultImage = defaultDepartmentImage;

export const UpdateDepartment = () => {
  const params = useParams();
  const department_id = params.id;
  const [department, setDepartment] = useState<UpdateDepartmentForm>({
    department_name: "",
    image: defaultImage,
    updated_at: "",
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [displayImage, setDisplayImage] = useState<string>(department.image);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(Number(department_id)).then((response) => {
      setDepartment(response.department);
    });
  }, []);

  const handleChangeDepartmentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartment({ ...department, department_name: event.target.value });
    setError("");
  };

  const handleChangeDepartmentImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    department.image = event.target.value;
    const isValidImage = await urlValidation(event.target.value);

    if (department.image !== "" && isValidImage === false) {
      setError("Invalid image url");
      setIsDisabled(true);
    } else if (department.image === "" || !department.image) {
      setIsDisabled(false);
    } else {
      setDisplayImage(department.image);
      setIsDisabled(false);
      setError("");
    }

    setDepartment({ ...department, image: department.image });
  };

  const submit = async () => {
    const request: UpdateDepartmentForm = {
      department_name: "",
      image: "",
      updated_at: "",
    };

    if (!department.department_name) {
      setError("Enter department name");
    } else {
      request.department_name = department.department_name;
      request.updated_at = new Date().toISOString();
      request.image = displayImage;

      updateDepartment(Number(department_id), request).then((_response) => {
        navigate(`/department/${department_id}`);
      });
    }
  };

  const backToAllDepartments = () => {
    navigate("/");
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
        <MenuDepartment />
        <div className="update-dep-container">
          <h2 className="title">{department.department_name}</h2>
          <img className="department-image" src={department.image} />
          <div className="update-input">
            <label>Update department name</label>
            <input
              className="department-data-input"
              type="text"
              value={department.department_name}
              onChange={(event) => handleChangeDepartmentName(event)}
            ></input>
          </div>
          <div className="update-input">
            <label>Update department logo</label>
            <input
              className="department-data-input"
              type="url"
              value={department.image}
              onChange={(event) => handleChangeDepartmentImage(event)}
            ></input>
          </div>

          <div className="d-flex">
            <Button
              className="my-3 mx-4"
              onKeyDown={handleKeyPress}
              onClick={submit}
              disabled={isDisabled}
            >
              Save
            </Button>

            <Button
              className="my-3"
              onKeyDown={handleKeyPress}
              onClick={backToAllDepartments}
            >
              Back to all departments
            </Button>

            {error !== "" ? (
              <p className="error-message" style={{ color: "red" }}>
                {error}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    );
  }
};
