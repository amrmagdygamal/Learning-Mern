import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/users";
import NavLoggedIn from "./NavLoggedIn";
import NavLoggedOut from "./NavLoggedOut";
import Logo from '../Free_Sample_By_Wix.jpg'

interface NavBarProps {
  loggedInUser: User | null,
  onSignUpClicked: () => void,
  onLoginClicked: () => void,
  onLogOutSuccess: () => void,
}


const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogOutSuccess}: NavBarProps) => {
  return (
    <Navbar className="wood" expand="sm" sticky="top" >
      <Container >
        <Navbar.Brand className="d-flex">
          <img className="img-fluid rounded-2 w-25" src={Logo} alt="logo"/>
          <h5 className="m-2 align-self-center">Notes App</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"/>
        <Navbar.Collapse id="main-navbar">
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