
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPersonBooth, FaBook, FaFileAlt, FaCertificate, FaAward, FaProjectDiagram, FaRegChartBar, FaFileContract } from 'react-icons/fa';

const IconGrid = () => {
  return (
    <section id='features'>
    <Container className="px-4 py-5" id="icon-grid">
      <h2 className="pb-2 border-bottom text-center">Features</h2>

      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5 text-center">
        <Col>
          <FaPersonBooth size={40} className="mb-3" />
          <h3 className="fw-bold mb-0 fs-4">Faculty Profile Management</h3>
          <p>Manage detailed faculty profiles including personal info, educational background, and contact details.</p>
        </Col>
        <Col>
          <FaBook size={40} className="mb-3" />
          <h3 className="fw-bold mb-0 fs-4">Subjects Handled</h3>
          <p>Track subjects taught by faculty, including pass percentages and performance metrics.</p>
        </Col>
        <Col>
          <FaFileAlt size={40} className="mb-3" />
          <h3 className="fw-bold mb-0 fs-4">Publications</h3>
          <p>Catalog research papers, journals, and conference papers authored by faculty.</p>
        </Col>
        <Col>
          <FaCertificate size={40} className="mb-3" />
          <h3 className="fw-bold mb-0 fs-4">Certifications</h3>
          <p>Record professional certifications obtained by faculty members.</p>
        </Col>
        <Col>
          <FaAward size={40} className="mb-3" />
          <h3 className="fw-bold mb-0 fs-4">Awards and Honors</h3>
          <p>Track honors and awards received by faculty for their contributions.</p>
        </Col>
        <Col>
          <FaProjectDiagram size={40} className="mb-3" />
          <h3 className="fw-bold mb-0 fs-4">Projects Handled</h3>
          <p>Monitor internal and external projects led by faculty members.</p>
        </Col>
        <Col>
          <FaRegChartBar size={40} className="mb-3" />
          <h3 className="fw-bold mb-0 fs-4">Funded Project Proposals</h3>
          <p>Manage proposals for funding, tracking approval status, and project details.</p>
        </Col>
        <Col>
          <FaFileContract size={40} className="mb-3" />
          <h3 className="fw-bold mb-0 fs-4">Patents</h3>
          <p>Record patents filed and granted to faculty members.</p>
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default IconGrid;