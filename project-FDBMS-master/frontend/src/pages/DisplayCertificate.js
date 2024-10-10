import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Image, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const DisplayCertificates = () => {
    const { currentUser } = useSelector(state => state.user);
    const certificates = currentUser.data.certifications;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCertificates, setFilteredCertificates] = useState(certificates);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = certificates.filter(cert => {
            const name = cert.name?.toLowerCase() || '';
            const description = cert.description?.toLowerCase() || '';
            const duration = cert.duration?.toLowerCase() || '';
            return name.includes(term.toLowerCase()) ||
                   description.includes(term.toLowerCase()) ||
                   duration.includes(term.toLowerCase());
        });

        setFilteredCertificates(filtered);
    };

    return (
        <Container fluid>
            <Row>
                <h1 className='font-weight-bold px-4'>Certificates</h1>
                <hr />
            </Row>
            <Row className='mb-3'>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search by title, description, or duration"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Accordion>
                {filteredCertificates.map((cert, index) => (
                    <Accordion.Item eventKey={index} key={index} className='mt-3 mb-3'>
                        <Accordion.Header>{cert.name}</Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Row>
                                    <Col><Image src={`${process.env.REACT_APP_API_URL}/uploads/${cert.fileId}`} rounded /></Col>
                                    <Col><p>{cert.duration}</p></Col>
                                    <Col><p>{cert.description}</p></Col>
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default DisplayCertificates;
