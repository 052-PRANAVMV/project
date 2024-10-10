import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { signInSuccess } from "../redux/user/userSlice";

const Books = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Use optional chaining to safely access books
  const books = currentUser?.data?.books || [];
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleDelete = async (bookId) => {
    setStatus({ loading: true, success: false, error: null });
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delbooks`, {
        data: {
          empId: currentUser?.data?.empId, // Use optional chaining
          id: bookId,
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
    <Container className="mt-4">
      <Container>
        <h1>BOOK DETAILS</h1>
        <Row className='d-flex justify-content-center'>
          <Button variant="primary" onClick={() => navigate('/bookform')} style={{ width: '25%', minWidth: '250px', margin: '30px' }}>Add Book</Button>
        </Row>
      </Container>

      {status.loading && <Alert variant="info">Deleting...</Alert>}
      {status.success && <Alert variant="success">Book deleted successfully.</Alert>}
      {status.error && <Alert variant="danger">{status.error}</Alert>}

      <Row>
        {books.map((book, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card 
              className="h-100 border-1 rounded-3 shadow-sm" 
              style={{ 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease' 
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.05)';
              }}
            >
              <Card.Body>
                <Card.Title>
                  <p><strong>Title:</strong> {book.title}</p>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <p><strong>Author:</strong> {book.author}</p>
                </Card.Subtitle>
                <Card.Text>
                  <p><strong>Description:</strong> {book.description}</p>
                  <p><strong>Academic Year:</strong> {book.academicYear}</p>
                </Card.Text>
                <Button variant="danger" onClick={() => handleDelete(book._id)} className='custom-button'>
                  <MdDelete />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Books;
