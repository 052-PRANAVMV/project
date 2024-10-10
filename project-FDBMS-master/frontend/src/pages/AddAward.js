import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../styles/AddAward.css'; // Ensure you have a CSS file or update the import as necessary
import { useSelector ,useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";

const AwardUploadForm = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch =  useDispatch();
    const [formValues, setFormValues] = useState({
        awardName: '',
        date: '',
        organization: '',
        awardImage: null,
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
        formData.append('empId', currentUser.data.empId);
        formData.append('awardName', formValues.awardName);
        formData.append('date', formValues.date);
        formData.append('organization', formValues.organization);
        formData.append('awardImage', formValues.awardImage);

        setStatus({ loading: true, success: false, error: null });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/uploadaward`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setStatus({ loading: false, success: true, error: null });
                dispatch(signInSuccess(response));
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : 'Server error';
            setStatus({ loading: false, success: false, error: errorMessage });
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Form className="certificate-form p-4 shadow-sm rounded" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Award Details</h2>
                {status.loading && <Alert variant="info">Uploading...</Alert>}
                {status.success && <Alert variant="success">Award added successfully.</Alert>}
                {status.error && <Alert variant="danger">{status.error}</Alert>}
                <Form.Group controlId="awardName">
                    <Form.Label>Award Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="awardName"
                        placeholder="Name of the award"
                        required
                        value={formValues.awardName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="date" className="mt-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        placeholder="Date of the award"
                        required
                        value={formValues.date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="organization" className="mt-3">
                    <Form.Label>Organization</Form.Label>
                    <Form.Control
                        type="text"
                        name="organization"
                        placeholder="Organization that presented the award"
                        required
                        value={formValues.organization}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="awardImage" className="mt-3">
                    <Form.Label>Upload Award Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="awardImage"
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

export default AwardUploadForm;