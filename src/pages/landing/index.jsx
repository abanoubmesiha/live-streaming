import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section className="landing">
      <Container fluid className="h-100 d-flex align-items-center justify-content-center">
        <Button
          variant="outline-danger"
          size="lg"
          onClick={() => navigate('/go-live')}
        >
          Go Live
        </Button>
        <div className="m-5" />
        <Button
          variant="outline-success"
          size="lg"
          onClick={() => navigate('/watch')}
        >
          Watch a Live
        </Button>
      </Container>
    </section>
  );
}
