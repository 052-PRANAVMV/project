import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <section id='contact'>
    <Container className="contact-section mt-5 p-4 bg-light rounded">
      <Row>
        <Col md={6} className="p-3 rounded" style={{backgroundColor:'#BDE7FE'}}>
          <h3 className="text-center mb-2 text-black">Contact Information</h3>
          <div className="mb-3 text-black text-center">
            <strong>College Name:</strong> VELAMMAL COLLEGE OF ENGINEERING AND TECHNOLOGY
          </div>
          <div className="mb-3 text-black text-center">
            <strong>Address:</strong> NH85, Viraganur, Tamil Nadu 625009
          </div>
          <div className="mb-3 text-black text-center">
            <strong>Phone:</strong> 099949 94991
          </div>
          <div className="mb-3 text-black text-center">
            <strong>E-Mail:</strong> principal@vcet
          </div>
          <div className='text-black text-center'>
            <strong>Website:</strong> <a href="https://www.vcet.ac.in" target="_blank" rel="noopener noreferrer" className="text-primary">https://www.vcet.ac.in</a>
          </div>
        </Col>
        <Col md={6} className="p-3 rounded" style={{backgroundColor:'#FFFFA9'}}>
          <h3 className="text-center">Contact Form</h3>
          <Form>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label className='d-flex justify-content-center'>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label className='d-flex justify-content-center'>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="mt-3" style={{ width: '40%' }}>
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default Contact;