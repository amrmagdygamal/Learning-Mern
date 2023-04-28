import { User } from '../models/users';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { ConflictError, UnauthorizedError } from '../errors/https_errors';

interface LoginModelProps {
  onDismiss: () => void,
  onLoginSuccess: (user: User) => void,
}

const LoginModel = ({onDismiss, onLoginSuccess}: LoginModelProps) => {

  const [errorText, setErrorText] = useState<string|null>(null);

  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    
    try {
      
      const user = await NotesApi.login(credentials);
      onLoginSuccess(user);

    } catch (error) {
      
      if(error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else  {

        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header className="wood" closeButton>
        <Modal.Title>
          Log In 
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="wood">
        {errorText && 
          <Alert variant='danger'>{errorText}</Alert>
        }
        <Form onSubmit={handleSubmit(onSubmit)}>
          
        <Form.Group className="wood mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className='input'
              type="text"
              placeholder="Username"
              {...register("username", { required: "Required" })}
            />
            {errors.username && (
              <Form.Text className="text-danger">Username is required</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className='input'
              type="password"
              placeholder="Password"
              {...register("password", { required: "Required" })}
            />
            {errors.password && (
              <Form.Text className="text-danger">Password is required</Form.Text>
            )}
          </Form.Group>

          <Button
          type="submit"
          className="w-100 add-button"
          variant='warning'
          disabled={isSubmitting}
        >
          Log In 
        </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModel