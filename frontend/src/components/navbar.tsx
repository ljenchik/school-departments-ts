import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/navbar.css";

export function Menu() {
  return (
    <nav id="navBar">
        <div id="navigation">
          <a href="/"><span>Departments</span></a>
         <a href="/employee"><span>Employees</span></a>
          <a href="/department/create"><span>Add department</span></a>
        </div>
      </nav>






    
  );
}
