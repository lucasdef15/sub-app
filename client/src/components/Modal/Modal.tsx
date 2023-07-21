import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  text: string;
  variant: 'primary' | 'secondary' | 'danger';
}
interface ErrorObject {
  msg: string;
}
interface ApiResponse {
  data?: {
    token?: string;
    user?: {
      id: string;
      email: string;
    };
  };
  errors?: ErrorObject[];
}

const ErrorMessage = styled.p`
  color: red;
`;

export default function ModalComponent({ text, variant }: ModalProps) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    const response = await axios.post<ApiResponse>(
      `http://localhost:8080/auth/${text.toLowerCase()}`,
      {
        email,
        password,
      }
    );
    const data = response.data;

    if (data && data.errors && data.errors.length) {
      return setErrorMsg(data.errors[0].msg);
    } else if (data && data.data) {
      localStorage.setItem('token', JSON.stringify(data.data.token));
      navigate('articles');
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size='lg'
        style={{ marginRight: '1rem', padding: '.3rem 2rem' }}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClick as () => void}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
