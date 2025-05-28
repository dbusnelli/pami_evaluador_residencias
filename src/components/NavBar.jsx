import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { INDEX_PAGE, VER_RESIDENCIAS_PAGE } from '../router/Routes';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={INDEX_PAGE}>Evaluador-Residencias</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={INDEX_PAGE}>Agregar residencias</Nav.Link>
            <Nav.Link href={VER_RESIDENCIAS_PAGE}>Ver residencias</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;