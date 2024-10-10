import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FaAddressBook, FaEnvelope, FaFile, FaIdCard, FaKeyboard, FaPhoneAlt, FaRocket, FaUser } from 'react-icons/fa';
import axios from 'axios';

const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    dob: '',
    experience: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      validateFile(selectedFile);
    }
  };

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      setErrors((prevState) => ({
        ...prevState,
        file: 'Invalid file type. Only JPEG, PNG, and PDF are allowed.',
      }));
    } else if (file.size > maxSize) {
      setErrors((prevState) => ({
        ...prevState,
        file: 'File size exceeds 2MB.',
      }));
    } else {
      setErrors((prevState) => {
        const { file, ...rest } = prevState;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Z]/.test(formData.name)) {
      newErrors.name = 'Name must start with an uppercase letter';
    }

    // Employee ID validation
    if (!formData.empId) {
      newErrors.empId = 'Employee ID is required';
    } else if (!/[A-Za-z0-9]/.test(formData.empId)) {
      newErrors.empId = 'Employee ID must include at least one alphanumeric character';
    }

    // Date of Birth validation
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';

    // Experience validation
    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (!/[0-9]/.test(formData.experience)) {
      newErrors.experience = 'Experience must be a valid number';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Address validation
    if (!formData.address) newErrors.address = 'Address is required';

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!/^[a-zA-Z*#0-9]+$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a digit';
    }

    // File validation
    if (!file) {
      newErrors.file = 'File is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSuccess('');
    } else {
      setErrors({});
      setSuccess('');

      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (file) {
        data.append('photoId', file);
      }

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        if (response.status === 201) {
          setSuccess('Form submitted successfully!');
          setFormData({
            name: '',
            empId: '',
            dob: '',
            experience: '',
            email: '',
            phone: '',
            address: '',
            password: '',
          });
          setFile(null);
        }
      } catch (error) {
        console.error(error);
        setErrors({ submit: 'Error submitting form. Please try again.' });
      }
    }
  };

  return (
    <>
      <div className='snow'/>
      <Container>
        <Row className="text-center">
          <h1 className="mt-4 mb-4 ">Registration Form</h1>
        </Row>
        <Form onSubmit={handleSubmit}>
          {success && <Alert variant="success">{success}</Alert>}
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} controlId="name">
              <Form.Floating>
                <Form.Control
                  className={`mb-3 ${errors.name ? 'is-invalid' : ''}`}
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label>
                  <FaUser />
                  {" "}Name
                </label>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </Form.Floating>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId="empId">
              <Form.Floating>
                <Form.Control
                  className={`mb-3 ${errors.empId ? 'is-invalid' : ''}`}
                  type="text"
                  placeholder="Employee ID"
                  value={formData.empId}
                  onChange={handleChange}
                />
                <label>
                  <FaIdCard />
                  {" "}Employee ID
                </label>
                {errors.empId && <div className="invalid-feedback">{errors.empId}</div>}
              </Form.Floating>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} controlId="dob">
              <Form.Floating>
                <Form.Control
                  className={`mb-3 ${errors.dob ? 'is-invalid' : ''}`}
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <label>Date of Birth</label>
                {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
              </Form.Floating>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId="experience">
              <Form.Floating>
                <Form.Control
                  className={`mb-3 ${errors.experience ? 'is-invalid' : ''}`}
                  type="text"
                  placeholder="Experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
                <label>
                  <FaRocket />
                  {" "}Experience (in yrs)
                </label>
                {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
              </Form.Floating>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} controlId="email">
              <Form.Floating>
                <Form.Control
                  className={`mb-3 ${errors.email ? 'is-invalid' : ''}`}
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>
                  <FaEnvelope />
                  {" "}Email
                </label>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </Form.Floating>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId="password">
              <Form.Floating>
                <Form.Control
                  className={`mb-3 ${errors.password ? 'is-invalid' : ''}`}
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label>
                  <FaKeyboard />
                  {" "}Password
                </label>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </Form.Floating>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} controlId="phone">
              <Form.Floating>
                <Form.Control
                  className={`mb-3 ${errors.phone ? 'is-invalid' : ''}`}
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label>
                  <FaPhoneAlt />
                  {" "}Phone
                </label>
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </Form.Floating>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId="file">
              <Form.Floating>
                <Form.Control
                  className={`mb-3 ${errors.file ? 'is-invalid' : ''}`}
                  type="file"
                  placeholder="File"
                  onChange={handleFileChange}
                />
                <label><FaFile />{" "}File</label>
                {errors.file && <div className="invalid-feedback">{errors.file}</div>}
              </Form.Floating>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="address">
            <Form.Floating>
              <Form.Control
                className={`mb-3 ${errors.address ? 'is-invalid' : ''}`}
                as="textarea"
                placeholder="Address"
                style={{ height: '100px' }}
                value={formData.address}
                onChange={handleChange}
              />
              <label>
                <FaAddressBook />
                {" "}Address
              </label>
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </Form.Floating>
          </Form.Group>

          <Container>
            <Row className="justify-content-center text-center">
              <Button variant="primary" type="submit" style={{ width: '20%', minWidth: '200px' }}>
                Register
              </Button>
            </Row>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default FacultyRegister;