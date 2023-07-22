import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

interface ModalProps {
  text: string;
  variant: 'primary' | 'secondary' | 'danger';
}

const ErrorMessage = styled.p`
  color: red;
`;

export default function ModalComponent({ text, variant }: ModalProps) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    const data = await axios.post(
      `http://localhost:8080/auth/${text.toLowerCase()}`,
      {
        email,
        password,
      }
    );
    const response = data.data;

    if (response && response.errors && response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
    } else if (response && response.data) {
      setState({
        data: {
          id: response.data.id,
          email: response.data.email,
        },
        loading: false,
        error: null,
      });
      localStorage.setItem('token', JSON.stringify(response.data.token));
      axios.defaults.headers.common[
        'authorization'
      ] = `Bearer ${response.data.token}`;
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
