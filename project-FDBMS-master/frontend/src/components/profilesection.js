import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Profilesection() {
  const {currentUser} = useSelector(state => state.user);
  const photoURL = `${process.env.REACT_APP_API_URL}/${currentUser.data.photoId}`;
  return (
    <Container fluid className='text-center pb-5 mt-5'>
      <Row className='justify-content-center'>
        <Col xs={6} md={4}>
          <Image src={photoURL} roundedCircle style={{ width: '150px', height: '150px' }} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>{currentUser.data.name}</h1>
          <h1 style={{ fontSize: '24px', fontWeight: 'semibold' }}>{currentUser.data.email}</h1>
          <h3 style={{ fontSize: '24px', fontWeight: 'lighter' }}> {currentUser.data.educationalBackground} </h3>
          <h3 style={{ fontSize: '24px', fontWeight: 'lighter' }}> Employee ID : {currentUser.data.empId} </h3>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs="auto">
          <a href='#linkedin' target='_blank' rel='noopener noreferrer'><FaLinkedin size={30} style={{ color: '#333' }} /></a>
        </Col>
        <Col xs="auto">
          <a href='#linkedin' target='_blank' rel='noopener noreferrer'><FaEnvelope size={30} style={{ color: '#333' }} /></a>
        </Col>
      </Row>
    </Container>
  )
}

export default Profilesection;