import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";

const EventForm = () => {
  const [formValues, setFormValues] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventImage: null,
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user data is available
    if (!currentUser || !currentUser.data || !currentUser.data.empId) {
      setStatus({ loading: false, success: false, error: 'User not found' });
      return;
    }

    const formData = new FormData();
    formData.append('eventname', formValues.eventName); // Ensure these names match your server
    formData.append('eventdes', formValues.eventDescription);
    formData.append('eventdate', formValues.eventDate);
    formData.append('eventimg', formValues.eventImage);
    formData.append('empId', currentUser.data.empId);

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/uploadevent`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form className="form-container p-4 shadow-sm rounded" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Event Details</h2>
        {status.loading && <Alert variant="info">Uploading...</Alert>}
        {status.success && <Alert variant="success">Event added successfully.</Alert>}
        {status.error && <Alert variant="danger">{status.error}</Alert>}
        
        <Form.Group controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            name="eventName"
            placeholder="Enter event name"
            value={formValues.eventName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventDescription" className="mt-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            as="textarea"
            name="eventDescription"
            placeholder="Enter event description"
            value={formValues.eventDescription}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventDate" className="mt-3">
          <Form.Label>Date of Event</Form.Label>
          <Form.Control
            type="date"
            name="eventDate"
            value={formValues.eventDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventImage" className="mt-3">
          <Form.Label>Upload Event Image</Form.Label>
          <Form.Control
            type="file"
            name="eventImage"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-center mt-4">
          <Button type="submit" className="submit-button">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EventForm;