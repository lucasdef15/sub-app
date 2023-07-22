import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const StyledNavLink = styled(Nav.Link)`
  color: rgba(255, 255, 255, 0.55);
  align-self: center;
  padding: 8px;
  font-weight: 400;
  font-family: inherit;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;

  &:hover {
    color: #c7c8c9;
  }
`;

const CustomLink = ({ to, children }) => {
  return (
    <StyledNavLink as={NavLink} to={to}>
      {children}
    </StyledNavLink>
  );
};

export default function NavBar() {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='#home'>Logo</Navbar.Brand>
          <Nav className='me-auto' style={{ flexBasis: '100%' }}>
            <CustomLink to='/'>Home</CustomLink>
            <CustomLink to='/about'>About</CustomLink>
            <CustomLink to='/help'>Help</CustomLink>
            {state.data && (
              <Nav.Link
                style={{ marginLeft: 'auto' }}
                onClick={(e) => handleLogout(e as unknown as MouseEvent)}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
