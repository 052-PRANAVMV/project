import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import Emp from '../images/emp.jpg';
import { useNavigate } from 'react-router-dom';

const CenteredContent = () => {
    const navigate = useNavigate();

  const handleGetStartClick = () => {
    navigate('/facultyLogin'); 
  };
  const handlesignup = () => {
    navigate('/adminLogin'); 
  };
  return (
    <Container className="px-4 pt-5 my-5 text-center border-bottom">
      <h1 className="display-4 fw-bold">Efficient Faculty Management at Your Fingertips</h1>
      <Row className="justify-content-center">
        <Col lg={6} className="mx-auto">
          <p className="lead mb-4">
          "Optimize Faculty Workflows with our All-in-one Management System, ensuring better Organization and Productivity"
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Button variant="primary" size="lg" className="px-4 me-sm-3" onClick={handleGetStartClick}>Get Start</Button>
            <Button variant="outline-secondary" size="lg" className="px-4" onClick={handlesignup}>Sign Up</Button>
          </div>
        </Col>
      </Row>
      <div className="overflow-hidden" style={{ maxHeight: '40vh' }}>
        <Container className="px-5">
          <Image
            src={Emp}
            fluid
            rounded
            className="border shadow-lg mb-4"
            alt="Example image"
            width="700"
            height="500"
            loading="lazy"
          />
        </Container>
      </div>
    </Container>
  );
};

export default CenteredContent;