import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import Product_card from './Product-card';

const HeroComponents = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-image: url('https://images.unsplash.com/photo-1530025809667-1f4bcff8e60f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1991&q=80');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default function Hero() {
  return (
    <HeroComponents>
      <Container>
        <Product_card />
      </Container>
    </HeroComponents>
  );
}
