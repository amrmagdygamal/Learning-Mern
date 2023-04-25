import React from 'react'
import { User } from '../models/users';
import { useForm } from 'react-hook-form';
import { SignUpCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Button, Form, Modal } from 'react-bootstrap';

interface SignUpModelProps {
  onDismiss: () => void,
  onSignUpSuccess: (user: User) => void,
}

const SignUpModel = ({onDismiss, onSignUpSuccess}: SignUpModelProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    
    try {
      
      const newUser = await NotesApi.signup(credentials);

      onSignUpSuccess(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header className="wood" closeButton>
        <Modal.Title>
          Sign Up
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="wood">
        <Form className="wood" onSubmit={handleSubmit(onSubmit)}>

        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              className='input'
              placeholder="Username"
              {...register("username", { required: "Required" })}
            />
            {errors.username && (
              <Form.Text className="text-danger">Username is required</Form.Text>
            )}
          </Form.Group>
          
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className='input'
              type="email"
              placeholder="email@gmail.com"
              {...register("email", { required: "Required" })}
            />
            {errors.email && (
              <Form.Text className="text-danger">Email is required</Form.Text>
            )}
          </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className='input'
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
          SingUp
        </Button>

        </Form>
      </Modal.Body>
    </Modal>
  )
};

export default SignUpModel