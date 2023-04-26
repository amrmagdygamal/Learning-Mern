import { Button } from "react-bootstrap"

interface NavLoggedOutProps {
  onSignUpClicked: () => void,
  onLoginClicked: () => void,
}

const NavLoggedOut = ({ onSignUpClicked, onLoginClicked }: NavLoggedOutProps) => {

  return (
    <div className="m-2 m-auto">
      <Button className="add-button mx-1" onClick={onSignUpClicked}>Sign Up</Button>
      <Button className="add-button mx-1" onClick={onLoginClicked}>Log In</Button>
    </div>
  )
}

export default NavLoggedOut;