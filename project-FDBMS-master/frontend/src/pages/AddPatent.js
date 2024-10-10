import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/PatentForm.css'; 
import { useSelector,useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";

const PatentForm = () => {

  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch(); 
  const [formValues, setFormValues] = useState({
  
    patentNo: '',
    patentTitle: '',
    patentDescription: '',
    dateOfPublishing: '',
    pdf: null
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      pdf: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('empId', currentUser.data.empId);
    data.append('patentNo', formValues.patentNo);
    data.append('patentTitle', formValues.patentTitle);
    data.append('patentDescription', formValues.patentDescription);
    data.append('dateOfPublishing', formValues.dateOfPublishing);
    data.append('pdf', formValues.pdf);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/faculty/add-patent`, data);
      if (response.status === 200) {
        alert('Patent added successfully');
        dispatch(signInSuccess(response));
        setFormValues({
          patentNo: '',
          patentTitle: '',
          patentDescription: '',
          dateOfPublishing: '',
          pdf: null
        });
      } else {
        alert('Failed to add patent');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add patent');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-4 mb-2">
      <Form className="form-container p-4 shadow-sm rounded" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Patent Details</h2>
        
        <Form.Group controlId="patentNo" className="mt-3">
          <Form.Label>Patent Number</Form.Label>
          <Form.Control
            type="text"
            name="patentNo"
            placeholder="Enter patent number"
            value={formValues.patentNo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="patentTitle" className="mt-3">
          <Form.Label>Patent Title</Form.Label>
          <Form.Control
            type="text"
            name="patentTitle"
            placeholder="Enter patent title"
            value={formValues.patentTitle}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="patentDescription" className="mt-3">
          <Form.Label>Patent Description</Form.Label>
          <Form.Control
            as="textarea"
            name="patentDescription"
            placeholder="Enter patent description"
            value={formValues.patentDescription}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group controlId="dateOfPublishing" className="mt-3">
          <Form.Label>Date of Publishing</Form.Label>
          <Form.Control
            type="date"
            name="dateOfPublishing"
            value={formValues.dateOfPublishing}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="pdf" className="mt-3">
          <Form.Label>Upload PDF</Form.Label>
          <Form.Control
            type="file"
            name="pdf"
            onChange={handleFileChange}
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

export default PatentForm;
