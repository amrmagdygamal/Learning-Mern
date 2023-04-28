import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/users";
import NavLoggedIn from "./NavLoggedIn";
import NavLoggedOut from "./NavLoggedOut";
import Logo from '../Free_Sample_By_Wix.jpg';
import { Link } from "react-router-dom";

interface NavBarProps {
  loggedInUser: User | null,
  onSignUpClicked: () => void,
  onLoginClicked: () => void,
  onLogOutSuccess: () => void,
}


const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogOutSuccess}: NavBarProps) => {
  return (
    <Navbar className="wood" expand="lg" sticky="top" >
      <Container >
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <img className="img-fluid rounded-2 w-25" src={Logo} alt="logo"/>
          <h5 className="m-2 align-self-center">Notes App</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"/>
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link className="text-center fs-4" as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto ">
            { loggedInUser 
            ? <NavLoggedIn user={loggedInUser} onLogoutSuccess={onLogOutSuccess} />
            : <NavLoggedOut  onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar