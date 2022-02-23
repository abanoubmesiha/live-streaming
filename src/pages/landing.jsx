import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Landing() {
  return (
    <section className="landing">
      <Container fluid className="h-100 d-flex align-items-center justify-content-center">
        <Button variant="outline-danger" size="lg">
          Go Live
        </Button>
        <div className="m-5" />
        <Button variant="outline-success" size="lg">
          Watch a Live
        </Button>
      </Container>
    </section>
  );
}

export default Landing;
