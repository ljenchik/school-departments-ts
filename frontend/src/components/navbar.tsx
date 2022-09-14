import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export function Menu() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Departments</Navbar.Brand>
        <Navbar.Brand href="/employee">Employees</Navbar.Brand>
        <Nav.Link href="/department/create">Add department</Nav.Link>
      </Container>
    </Navbar>
  );
}
