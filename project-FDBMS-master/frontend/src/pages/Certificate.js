import React, { useState } from 'react';
import { Container, Row, Col, Button, Accordion, Image, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { signInSuccess } from '../redux/user/userSlice';

const Certificates = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Use optional chaining to safely access certificates
  const certificates = currentUser?.data?.certifications || [];

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleDelete = async (certId) => {
    setStatus({ loading: true, success: false, error: null });
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delcertificates`, {
        data: {
          empId: currentUser?.data?.empId, // Use optional chaining
          id: certId,
        },
      });
      if (response.status === 200) {
        dispatch(signInSuccess(response));
        setStatus({ loading: false, success: true, error: null });
      }
    } catch (error) {
      const errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : 'Server error';
      setStatus({ loading: false, success: false, error: errorMessage });
    }
  };

  const handleUploadCertificate = () => {
    navigate('/certificate-upload');
  };

  return (
    <Container fluid>
      {status.loading && <Alert variant="info">Deleting...</Alert>}
      {status.success && <Alert variant="success">Certificate deleted successfully.</Alert>}
      {status.error && <Alert variant="danger">{status.error}</Alert>}

      <Accordion>
        {certificates.map((cert, index) => (
          <Accordion.Item eventKey={index} key={index} className='mt-3 mb-3'>
            <Accordion.Header>{cert.name}</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col><Image src={`${process.env.REACT_APP_API_URL}/uploads/${cert.fileId}`} rounded /></Col>
                  <Col><p>{cert.duration}</p></Col>
                  <Col><p>{cert.description}</p></Col>
                  <Col>
                    <Button className="custom-button" variant="danger" onClick={() => handleDelete(cert._id)}>
                      <MdDelete />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Container>
        <Row className="d-flex justify-content-center">
          <Button className="mt-3 md-4 sm-2" variant='primary' style={{ width: '20%', minWidth: '300px' }} onClick={handleUploadCertificate}>Add a new certificate</Button>
        </Row>
      </Container>
    </Container>
  );
};

export default Certificates;
