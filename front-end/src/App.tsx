import { useEffect, useState } from "react";
import "./App.css";
import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";
import SignUpModel from "./components/SignUpModel";
import { User } from "./models/users";
import * as NotesApi from './network/notes_api';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import PrivacePage from "./pages/PrivacePage";
import NotFoundPage from "./pages/NotFoundPage";


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
    <BrowserRouter>
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => {setShowSignUpModal(true)}}
        onLoginClicked={() => {setShowLoginModal(true)}}
        onLogOutSuccess={() => setLoggedInUser(null)}
      />
      
      <Routes>
        <Route
        path="/"
        element={<NotesPage loggedInUser={loggedInUser}/>}
        />
        <Route
        path="/privacy"
        element={<PrivacePage />}
        />
        <Route
        path="/*"
        element={<NotFoundPage />}
        />
      </Routes>
      
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
    </BrowserRouter>
  );
}

export default App;
