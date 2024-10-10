import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { signInSuccess } from "../redux/user/userSlice";

function Addaward() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const awards = currentUser.data.awards;
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleDelete = async (awardId) => {
    setStatus({ loading: true, success: false, error: null });
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delawards`, {
        data: {
          empId: currentUser.data.empId,
          id: awardId,
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
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Carousel>
              {awards.map((award, index) => (
                <Carousel.Item key={award._id} interval={1000}>
                  <Image src={`${process.env.REACT_APP_API_URL}/uploads/${award.fileId}`} rounded />
                  <Carousel.Caption>
                    <h3>{award.name}</h3>
                    <p>{award.date}</p>
                    <p>{award.issue}</p>
                    <Button variant="danger" onClick={() => handleDelete(award._id)} className='custom-button'>
                      <MdDelete />
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <Container>
        <Row className='d-flex justify-content-center'>
          <Button variant="primary" onClick={() => navigate('/awardform')} style={{ width: '25%', minWidth: '250px' }}>Add Award</Button>
        </Row>
        <Row>
        {status.loading && <Alert variant="info">Deleting...</Alert>}
        {status.success && <Alert variant="success">Award deleted successfully.</Alert>}
        {status.error && <Alert variant="danger">{status.error}</Alert>}
        </Row>
      </Container>
    </>
  );
}

export default Addaward;
