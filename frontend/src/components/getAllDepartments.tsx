import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { getAllDepartments } from "../apiClient";
import { Link } from "react-router-dom";
import "../css/getAllDepartments.css";
import { Container } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "better-react-carousel";

export const GetAllDepartments = () => {
  const [departments, setDepartments] = useState<any>([]);

  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.departments);
    });
  }, []);

  return (
    <Container >
      <h4 className="title">Departments</h4>
      <br />
      <Carousel cols={3} rows={1} gap={20} loop style={{ margin: "0px" }}>
        {departments.map(
          (department: {
            id: any;
            image: string | undefined;
            department_name: any;
          }) => (
            <Carousel.Item>
              <Link to={`/department/${department.id}`} className="link">
                <div>{department.department_name}</div>
                <img width="100%" src={department.image} />
              </Link>
            </Carousel.Item>
          )
        )}

        <Carousel.Item>
          <Link to={`/department/create`} className="link">
            <div>Add new department</div>
            <img
              width="100%"
              src="https://www.villageofallouezwi.gov/wp-content/uploads/2013/04/departments.jpg"
            />
          </Link>
        </Carousel.Item>
      </Carousel>

      <br />
      {departments.map(
        (department: {
          id: Key | null | undefined;
          department_name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        }) => (
          <div key={department.id}>
            <Link to={`/department/${department.id}`} className="link">
              {" "}
              {department.department_name}{" "}
            </Link>
          </div>
        )
      )}
      <br />
      <Link to="/department/create" className="add-link">
        {" "}
        Add a new department{" "}
      </Link>
    </Container>
  );
};
