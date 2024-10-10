import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

const DisplayBooks = () => {
    const { currentUser } = useSelector((state) => state.user);
    const books = currentUser.data.books;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = books.filter(book => {
            const title = book.title?.toLowerCase() || '';
            const author = book.author?.toLowerCase() || '';
            const description = book.description?.toLowerCase() || '';
            const academicYear = book.academicYear?.toLowerCase() || '';
            return title.includes(term.toLowerCase()) ||
                   author.includes(term.toLowerCase()) ||
                   description.includes(term.toLowerCase()) ||
                   academicYear.includes(term.toLowerCase());
        });

        setFilteredBooks(filtered);
    };

    return (
        <Container className="mt-4">
            <h1>BOOK DETAILS</h1>
            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search by title, author, description, or academic year"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Row>
                {filteredBooks.map((book, index) => (
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
                                <Button 
                                    variant="primary" 
                                    className="text-center custom-button"
                                    onClick={() => window.open(`${process.env.REACT_APP_API_URL}/uploads/${book.fileId}`, '_blank')}
                                >
                                    View PDF
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default DisplayBooks;
