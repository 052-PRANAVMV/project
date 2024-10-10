import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../styles/CertificateUpload.css';
import { useSelector } from 'react-redux';

const CertificateUploadForm = () => {
    const {currentUser} = useSelector(state => state.user)
    const [formValues, setFormValues] = useState({
        nameofcer: '',
        Describecertificate: '',
        Duration: '',
        upload: null,
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormValues({
            ...formValues,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('empId', currentUser.data.empId);  // Set the empId here or dynamically
        formData.append('nameofcer', formValues.nameofcer);
        formData.append('Describecertificate', formValues.Describecertificate);
        formData.append('Duration', formValues.Duration);
        formData.append('upload', formValues.upload);

        setStatus({ loading: true, success: false, error: null });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/uploadcertificate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setStatus({ loading: false, success: true, error: null });
            }
        } catch (error) {
            setStatus({ loading: false, success: false, error: error.response ? error.response.data : 'Server error' });
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Form className="certificate-form p-4 shadow-sm rounded" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Certificate Details</h2>
                {status.loading && <Alert variant="info">Uploading...</Alert>}
                {status.success && <Alert variant="success">Certificate added successfully.</Alert>}
                {status.error && <Alert variant="danger">{status.error}</Alert>}
                <Form.Group controlId="nameofcer">
                    <Form.Label>Name Of Certificate</Form.Label>
                    <Form.Control
                        type="text"
                        name="nameofcer"
                        placeholder="Name of the certificate"
                        required
                        value={formValues.nameofcer}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="Describecertificate" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="Describecertificate"
                        placeholder="Describe The Certificate"
                        required
                        value={formValues.Describecertificate}
                        onChange={handleChange}
                        rows={3}
                    />
                </Form.Group>
                <Form.Group controlId="Duration" className="mt-3">
                    <Form.Label>Duration or Period</Form.Label>
                    <Form.Control
                        type="text"
                        name="Duration"
                        placeholder="Duration or Period"
                        required
                        value={formValues.Duration}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="upload" className="mt-3">
                    <Form.Label>Upload Certificate</Form.Label>
                    <Form.Control
                        type="file"
                        name="upload"
                        required
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className="text-center mt-4">
                    <Button type="submit" className="add-button">
                        Add
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default CertificateUploadForm;
