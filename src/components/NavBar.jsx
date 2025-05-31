import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { INDEX_PAGE, VER_RESIDENCIAS_PAGE } from '../router/Routes';
import {} from "../../public/assets/logo.png"

function NavBar() {
  return (
    <Navbar expand="lg" className="text-secondary" variant="dark" style={{backgroundColor: "#050a3d"}}>
      <Container>
        <Navbar.Brand href={INDEX_PAGE}><img src="../../public/assets/logo.png" width={"185rem"}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={INDEX_PAGE} className=" text-light">Agregar residencias</Nav.Link>
            <Nav.Link href={VER_RESIDENCIAS_PAGE} className=" text-light">Ver residencias</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;