import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function HomePage() {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to the App</h1>
      <LinkContainer to="/people">
        <Button variant="primary" className="m-3">Go to People Page</Button>
      </LinkContainer>
      <LinkContainer to="/groups">
        <Button variant="secondary" className="m-3">Go to Groups Page</Button>
      </LinkContainer>
    </div>
  );
}

export default HomePage;
