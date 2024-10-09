import React from 'react';
import { Container, Row, Col ,Button} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
function AdminPage() {
  const navigate=useNavigate();

  const handleAdd = ()=>{
    navigate('/facultyRegister');

  }

  const handleAddAdmin = ()=>{
    navigate('/adminRegister');
  }

  const handleview=()=>{
    navigate('/viewfaculty')
  }
  return (
    <Container className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <Row className='text-center'>
        <Col>
          <h1 className='display-1 font-weight-bold ' style={{ fontFamily: 'fantasy' }}>WELCOME ADMIN</h1>
          <h5 className='display-5 ' style={{ fontFamily: 'a' }}>Here you can Add, Modify, Delete Faculty Details</h5>
        </Col>
      </Row>
      <Row className='text-center mt-4'>
        <Col md={4} className='mb-4'>
          <Button variant='success' style={{ width: '200px' }} onClick={handleAdd}>Add Faculty</Button>
        </Col>
        <Col md={4} className='mb-4'>
          <Button variant='primary' style={{ width: '200px' }} onClick={handleAddAdmin}>Add Admin</Button>
        </Col>
       
        <Col md={4} className='mb-4'>
          <Button variant='secondary' style={{ width: '200px' }} onClick={handleview}>View Faculty</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;