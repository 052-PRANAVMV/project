import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';

function Eventpage() {
  const { currentUser } = useSelector(state => state.user);
  const events = currentUser.data.events;

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = events.filter(event => {
      const name = event.name?.toLowerCase() || '';
      const description = event.description?.toLowerCase() || '';
      const date = event.date?.toLowerCase() || '';
      return name.includes(term.toLowerCase()) ||
             description.includes(term.toLowerCase()) ||
             date.includes(term.toLowerCase());
    });

    setFilteredEvents(filtered);
  };

  return (
    <Container className='mt-5 mb-5' style={{ width: '100%' }}>
      <Container>
        <Row className='text-center'>
          <Col>
            <h1>EVENTS ORGANIZED BY {currentUser.data.name}</h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='mb-3'>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by name, description, or date"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Row className='mt-5 mb-5 slide-in-left' key={index}>
              <Col xs={12} md={4} className='d-flex justify-content-center'>
                <Image
                  src={`${process.env.REACT_APP_API_URL}/uploads/${event.image}`}
                  style={{ borderRadius: '20px', maxWidth: '100%', height: 'auto' }}
                  alt={event.eventname}
                />
              </Col>
              <Col xs={12} md={8} className='mt-4'>
                <h5><strong>NAME:</strong> {event.name}</h5>
                <h5><strong>DESCRIPTION:</strong> {event.description}</h5>
                <h5><strong>DATE:</strong> {event.date}</h5>
              </Col>
            </Row>
          ))
        ) : (
          <Row className='text-center'>
            <Col>
              <p>No events found.</p>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Eventpage;
