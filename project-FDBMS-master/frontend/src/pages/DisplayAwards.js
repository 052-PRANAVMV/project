import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Image, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function DisplayAward() {
    const { currentUser } = useSelector(state => state.user);
    const awards = currentUser.data.awards;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAwards, setFilteredAwards] = useState(awards);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        
        const filtered = awards.filter(award => {
            const name = award.name?.toLowerCase() || '';
            const date = award.date?.toLowerCase() || '';
            const organization = award.organization?.toLowerCase() || '';
            const issuer = award.issuer?.toLowerCase() || '';
            return name.includes(term.toLowerCase()) ||
                   date.includes(term.toLowerCase()) ||
                   organization.includes(term.toLowerCase()) ||
                   issuer.includes(term.toLowerCase());
        });

        setFilteredAwards(filtered);
    };

    return (
        <Container fluid>
            <Row>
                <h1 className='font-weight-bold px-4'>Awards</h1>
                <hr />
            </Row>
            <Row className='mb-3'>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search by name, date, organization, or issuer"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Accordion>
                {filteredAwards.map((award, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index} className='mt-3 mb-3'>
                        <Accordion.Header>{award.name}</Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Row>
                                    <Col><Image src={`${process.env.REACT_APP_API_URL}/uploads/${award.fileId}`} rounded/></Col>
                                    <Col><p>{award.date}</p></Col>
                                    <Col><p>{award.organization}</p></Col>
                                    <Col><p>{award.issuer}</p></Col>
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}

export default DisplayAward;
