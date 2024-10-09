import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomJumbotron = () => {
  return (
    <section id='about'>
    <Container className="py-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        <Container fluid className="py-5">
          <h1 className="display-5 fw-bold text-center">Introduction to Our Faculty Management System</h1>
          <Row className="d-flex justify-content-center">
            <Col md={10}>
              <p className="fs-5 text-center text-md-start">
                Welcome to our Faculty Management System Tailored for VCET. Our Innovative Platform is designed to streamline administrative tasks and foster collaboration among faculty members. By centralizing Faculty Profiles, Academic Records, and administrative processes, we empower educators to focus more on academic excellence and less on paperwork. This system not only enhances efficiency but also supports our commitment to providing a conducive environment for teaching, research, and professional development.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Row className="align-items-md-stretch">
        <Col md={6} className="mb-4 mb-md-0">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h2 className="text-center">Benefits for VCET</h2>
            <p className="text-center text-md-start">
              Implementing our Faculty Management System at VCET marks a significant advancement in how we support our faculty. This comprehensive toolset enables faculty members to manage their schedules seamlessly, track academic achievements, and collaborate on research initiatives effortlessly. By optimizing administrative workflows and promoting interdisciplinary collaboration, we aim to elevate academic standards and improve operational efficiency across the institution.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2 className="text-center">Features and Capabilities</h2>
            <p className="text-center text-md-start">
              Our Faculty Management System offers robust features tailored to meet the diverse needs of our faculty. From efficient scheduling and document management to performance tracking and research collaboration tools, this system supports every aspect of faculty operations. By integrating these capabilities, we empower faculty members to excel in their roles, contribute to institutional goals, and uphold [Your College Name]'s reputation as a leader in academic innovation and excellence.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default CustomJumbotron;