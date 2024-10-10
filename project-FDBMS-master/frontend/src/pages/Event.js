import React, { useState } from 'react';
import { Container, Row, Col, Image, Alert ,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';


function AddEvents() {
  const { currentUser } = useSelector(state => state.user);
  const events = currentUser.data.events;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleDelete = async (eventId) => {
    setStatus({ loading: true, success: false, error: null });
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delevents`, {
        data: {
          empId: currentUser.data.empId,
          id: eventId,
        },
      });
      if (response.status === 200) {
        dispatch(signInSuccess(response));
        setStatus({ loading: false, success: true, error: null });
        // Optionally, update the state to remove the deleted event from the list
        // For example, filter out the deleted event from the events array
      }
    } catch (error) {
      const errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : 'Server error';
      setStatus({ loading: false, success: false, error: errorMessage });
    }
  };

  return (
    <Container className='mt-5 mb-5' style={{ width: '100%' }}>
      <Container>
        <Row className='text-center'>
          <Col>
            <h1>EVENTS ORGANIZED BY VCET</h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container>
        {status.loading && <Alert variant="info">Deleting...</Alert>}
        {status.success && <Alert variant="success">Event deleted successfully.</Alert>}
        {status.error && <Alert variant="danger">{status.error}</Alert>}
        {events.length > 0 ? (
          events.map((event, index) => (
            <Row className='mt-5 mb-5 slide-in-left' key={index}>
              <Col xs={12} md={4} className='d-flex justify-content-center'>
                <Image
                  src={`${process.env.REACT_APP_API_URL}/uploads/${event.image}`}
                  rounded
                />
              </Col>
              <Col xs={12} md={8} className='mt-4'>
                <h5>
                  <strong>NAME:</strong> {event.name}
                </h5>
                <h5>
                  <strong>DESCRIPTION:</strong> {event.description}
                </h5>
                <h5>
                  <strong>DATE:</strong> {event.date}
                </h5>
                <button onClick={() => handleDelete(event._id)} className='custom-button'>
                  <MdDelete />
                </button>
              </Col>
            </Row>
          ))
        ) : (
          <Row className='text-center'>
            <Col>
              <p>No events found.</p>
            </Col>
          </Row>
        )}
      </Container>

      <Row className='text-center'>
        <Col>
          <Button variant="primary" onClick={() => navigate('/eventform')}>Add Event</Button>
        </Col>
      </Row>

    </Container>
  );
}

export default AddEvents;