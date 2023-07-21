import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='#home'>Logo</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link>
              <NavLink to='/'>Home</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='about'>About</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='help'>Help</NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
