import React, { useState } from 'react';
import { Accordion, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { signInSuccess } from '../redux/user/userSlice';

function Patents() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Use optional chaining to safely access patents
  const patents = currentUser?.data?.patents || [];

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleDelete = async (patentId) => {
    setStatus({ loading: true, success: false, error: null });
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delpatents`, {
        data: {
          empId: currentUser?.data?.empId, // Use optional chaining
          id: patentId,
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

  return (
    <Container fluid className='vh-100'>
      <Row>
        <h1 className='font-weight-bold display-3 px-3'>PATENTS</h1>
      </Row>

      {status.loading && <Alert variant="info">Deleting...</Alert>}
      {status.success && <Alert variant="success">Patent deleted successfully.</Alert>}
      {status.error && <Alert variant="danger">{status.error}</Alert>}

      <Accordion>
        {patents.map((patent, index) => (
          <Accordion.Item eventKey={index} key={patent._id} className='mt-3 mb-3'>
            <Accordion.Header>{patent.title}</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col style={{ width: '20%' }}><strong>Patent No: </strong></Col>
                <Col>{patent.p_no}</Col>
              </Row>
              <Row>
                <Col style={{ width: '20%' }}><strong>Description: </strong></Col>
                <Col>{patent.description}</Col>
              </Row>
              <Row>
                <Col style={{ width: '20%' }}><strong>Date of Publishing: </strong></Col>
                <Col>{patent.dop}</Col>
              </Row>
              <Row>
                <Col>
                  <Button className="custom-button" variant="danger" onClick={() => handleDelete(patent._id)}>
                    <MdDelete />
                  </Button>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Row className='d-flex justify-content-center'>
        <Button variant='primary' onClick={() => navigate('/patentform')} style={{ width: '25%', minWidth: '150px' }}>Add Patent</Button>
      </Row>
    </Container>
  );
}

export default Patents;
