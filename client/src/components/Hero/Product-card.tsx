import Card from 'react-bootstrap/Card';
import ModalComponent from '../Modal/Modal';

export default function Product_card() {
  return (
    <Card style={{ width: '400px', background: '#2cada3dc', color: '#fff' }}>
      <Card.Body>
        <Card.Title style={{ fontSize: '3.5rem' }}>
          Feed your mind with the best
        </Card.Title>
        <Card.Text style={{ fontSize: '1.3rem' }}>
          Grow, learn, and become more successful by reading some of the top
          articles by higly reputable individuals
        </Card.Text>
        <ModalComponent text='Signup' variant='primary' />
        <ModalComponent text='Login' variant='danger' />
      </Card.Body>
    </Card>
  );
}
