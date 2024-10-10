import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Container, Row, Alert, Form, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";



const View = () => {
    const [faculty, setFaculty] = useState([]);
    const [filteredFaculty, setFilteredFaculty] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/facultydetails`);
                if (response.status === 200) {
                    setFaculty(response.data);
                    setFilteredFaculty(response.data);
                }
            } catch (error) {
                setStatus({ loading: false, success: false, error: error.message });
            }
        };

        fetchFaculty();
    }, []);

    const handleDelete = async (empid) => {
        try {
            setStatus({ loading: true, success: false, error: null });
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delfac`, {
                data: { facid: empid }
            });
            if (response.status === 200) {
                setStatus({ loading: false, success: true, error: null });
                setFaculty(faculty.filter(f => f._id !== empid));
                setFilteredFaculty(filteredFaculty.filter(f => f._id !== empid));
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data.message : 'Server error';
            setStatus({ loading: false, success: false, error: errorMessage });
        }
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = faculty.filter(facultyItem => {
            const name = facultyItem.name?.toLowerCase() || '';
            const email = facultyItem.email?.toLowerCase() || '';
            const empId = facultyItem.empId?.toLowerCase() || '';
            return name.includes(term.toLowerCase()) ||
                   email.includes(term.toLowerCase()) ||
                   empId.includes(term.toLowerCase());
        });

        setFilteredFaculty(filtered);
    };

    const handleViewDetails = async (empid) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/facultyview`, { facid: empid });
            if (response.status === 200) {
                dispatch(signInSuccess(response));
                navigate('/dashboardview');
                
            }
        } catch (error) {
            console.error("Error fetching faculty details", error);
            setStatus({ loading: false, success: false, error: "Error fetching faculty details" });
        }
    };

    return (
        <>
            <h1>Faculty Details</h1>
            <Container>
                <Row className="mb-3">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Search by name, email, or employee ID"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Col>
                </Row>
                {status.loading && <Alert variant="info">Deleting...</Alert>}
                {status.success && <Alert variant="success">Faculty deleted successfully.</Alert>}
                {status.error && <Alert variant="danger">{status.error}</Alert>}  
            
                {filteredFaculty.length > 0 ? (
                    <Row>
                        {filteredFaculty.map((facultyItem, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mt-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{facultyItem.name}</Card.Title>
                                        <Card.Text>
                                            <strong>Email:</strong> {facultyItem.email}<br />
                                            <strong>Employee ID:</strong> {facultyItem.empId}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleViewDetails(facultyItem._id)} className="custom-button">View Details</Button>
                                        <Button variant="danger" onClick={() => handleDelete(facultyItem._id)} className="custom-button mt-3" >Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>No faculty details found</p>
                )}
            </Container>
        </>
    );
};

export default View;
