import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useSelector , useDispatch} from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";
import '../styles/AddBooks.css'
const BookForm = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [newBook, setNewBook] = useState({
        academicYear: '',
        title: '',
        author: '',
        description: '',
        ISBN: '',
        pdf: null
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setNewBook({
            ...newBook,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookform = new FormData();
        bookform.append('academicYear', newBook.academicYear);
        bookform.append('title', newBook.title);
        bookform.append('author', newBook.author);
        bookform.append('description', newBook.description);
        bookform.append('ISBN', newBook.ISBN);
        bookform.append('pdf', newBook.pdf);
        bookform.append('empId', currentUser.data.empId);

        setStatus({ loading: true, success: false, error: null });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/uploadbook`, bookform, {
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
        <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
            <Row className="w-100 book-form-row" >
                <Col
                    xs={12} md={8} lg={6}
                    className="mx-auto book-form-col"
                    style={{  transition: 'transform 0.3s'  }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Form
                        onSubmit={handleSubmit}
                        className="p-4 border rounded book-form-wrapper"
                        style={{ backgroundColor: '#ffffff', transition: 'box-shadow 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)' }
                    >
                        <h2 className="text-center mb-4">Book Details</h2>
                        {status.loading && <Alert variant="info">Uploading...</Alert>}
                        {status.success && <Alert variant="success">Book added successfully.</Alert>}
                        {status.error && <Alert variant="danger">{status.error}</Alert>}
                        
                        <Form.Group controlId="academicYear" className='book-form-group mb-3'>
                            <Form.Label>Academic Year</Form.Label>
                            <Form.Control
                                type="text"
                                name="academicYear"
                                value={newBook.academicYear}
                                onChange={handleChange}
                                placeholder="Enter academic year"
                                className='book-form-control'
                            />
                        </Form.Group>
                        <Form.Group controlId="title" className='book-form-group mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newBook.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                className='book-form-control'
                            />
                        </Form.Group>
                        <Form.Group controlId="author" className='book-form-group mb-3'>
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={newBook.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                                className='book-form-control'
                            />
                        </Form.Group>
                        <Form.Group controlId="description" className='book-form-group mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newBook.description}
                                onChange={handleChange}
                                placeholder="Enter book description"
                                className='book-form-control'
                            />
                        </Form.Group>
                        <Form.Group controlId="ISBN" className='book-form-group mb-3'>
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                type="text"
                                name="ISBN"
                                value={newBook.ISBN}
                                onChange={handleChange}
                                placeholder="Enter ISBN number"
                                className='book-form-control'
                            />
                        </Form.Group>
                        <Form.Group controlId="pdf" className='book-form-group mb-3'>
                            <Form.Label>PDF</Form.Label>
                            <Form.Control
                                type="file"
                                name="pdf"
                                onChange={handleChange}
                                className='book-form-control'
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className='submit-btn'
                            style={{ padding: '10px 20px', transition: 'background-color 0.3s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                        >
                            Add Book
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default BookForm;