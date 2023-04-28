import { Container } from "react-bootstrap";
import NotesPageLoggedIn from "../components/NotesPageLoggedIn";
import NotesPageLoggedOut from "../components/NotesPageLoggedOut";
import { User } from "../models/users";

interface NotesPageProps {
  loggedInUser: User | null,
}

const NotesPage = ( { loggedInUser }: NotesPageProps) => {
  return (
    <Container className="w-100 d-flex flex-column align-items-center">
      <>{loggedInUser ? <NotesPageLoggedIn /> : <NotesPageLoggedOut />}</>
    </Container>
  );
};

export default NotesPage;
