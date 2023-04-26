import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/users";
import * as NotesApi from '../network/notes_api';

interface NavLoggedInProps {
  user: User,
  onLogoutSuccess: () => void,
}


const NavLoggedIn = ({ user, onLogoutSuccess }: NavLoggedInProps) => {

  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccess();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <>
      <Navbar.Text className="d-flex align-items-center  m-auto">
        <h5 className="mb-3">Signed in as: </h5>
        <p className="text-success fs-4 ms-1">{user.username}</p>
      </Navbar.Text>
      <Button className="add-button align-self-center mb-2 ms-2" onClick={logout}>Log Out</Button>
    </>
  )
}

export default NavLoggedIn;