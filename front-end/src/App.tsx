import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";
import SignUpModel from "./components/SignUpModel";
import { User } from "./models/users";
import * as NotesApi from './network/notes_api';
import NotesPageLoggedIn from "./components/NotesPageLoggedIn";
import NotesPageLoggedOut from "./components/NotesPageLoggedOut";


const  App = () => {

const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

const [showSignUpModal, setShowSignUpModal] = useState(false);
const [showLoginModal, setShowLoginModal] = useState(false);


useEffect(() => {

  async function fetchLoggedInUser() {
    
    try {

      const user = await NotesApi.getLoggedInUser();

      setLoggedInUser(user);
      
    } catch (error) {
      console.error(error);
    }
  }

  fetchLoggedInUser();
})

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => {setShowSignUpModal(true)}}
        onLoginClicked={() => {setShowLoginModal(true)}}
        onLogOutSuccess={() => setLoggedInUser(null)}
      />
      <Container className="w-100 d-flex flex-column align-items-center">
        <>
          { loggedInUser ? <NotesPageLoggedIn /> : <NotesPageLoggedOut />}
        </>

      </Container>

      
      {showSignUpModal && (
          <SignUpModel onDismiss={() => setShowSignUpModal(false)} onSignUpSuccess={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }} />
        )}
        {showLoginModal && <LoginModel onDismiss={() => setShowLoginModal(false)} onLoginSuccess={(user) => {
          setLoggedInUser(user);
          setShowLoginModal(false)
        }} />}
    </>
  );
}

export default App;
