import React, { useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { signInSuccess } from '../redux/user/userSlice';
import '../styles/Subjects.css';

const Subjects = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const subjectCards = currentUser?.data?.subjectsHandled || [];
  const navigate = useNavigate();

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleDelete = async (subjectId) => {
    setStatus({ loading: true, success: false, error: null });
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delsubjects`, {
        data: {
          empId: currentUser?.data?.empId, // Use optional chaining
          id: subjectId,
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
    <div>
      <Container className="d-flex px-4" style={{ justifyContent: "center" }}>
        <Row className="text-center">
          <Col>
            <h1>Subjects Handled By</h1>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>{currentUser.data.name}</h1>
            <h2 style={{ fontSize: '15px', fontWeight: 'lighter' }}>{currentUser.data.educationalBackground}</h2>
          </Col>
          <div className="text-center my-4">
            <Button variant="success" onClick={() => { navigate('/Subjectform') }}>Add Subject</Button>
          </div>
        </Row>
      </Container>

      {status.loading && <Alert variant="info">Deleting...</Alert>}
      {status.success && <Alert variant="success">Subject deleted successfully.</Alert>}
      {status.error && <Alert variant="danger">{status.error}</Alert>}

      <Container className="mt-4">
        <Row>
          {subjectCards.map((subject, index) => (
            <Col key={index} md={6} className="card-container">
              <Card style={{ width: '200%' }}>
                <Card.Body>
                  <Card.Title className="card-title">{subject.name}</Card.Title>
                  <Card.Subtitle className="mb-2 card-subtitle">{subject.coursecode}</Card.Subtitle>
                  <Card.Text>
                    <p>Consider the Pass Percentage</p>
                    {subject.internalPassPercentages.map((exam, examIndex) => (
                      <div key={examIndex}>
                        <p>{exam.examType}</p>
                        <ProgressBar
                          now={exam.percentage}
                          label={`${exam.percentage}%`}
                          variant="info"
                        />
                      </div>
                    ))}
                  </Card.Text>
                  <Button className="custom-button" variant="danger" onClick={() => handleDelete(subject._id)}>
                    <MdDelete />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Subjects;
