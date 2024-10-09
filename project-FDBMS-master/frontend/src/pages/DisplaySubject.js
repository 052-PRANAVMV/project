import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import '../styles/Subjects.css';
import { useSelector } from "react-redux";



const DisplaySubjects = () => {

  const { currentUser } = useSelector(state => state.user);
  const subjectCards = currentUser.data.subjectsHandled;
 

  return (
    <div>
      <Container className="d-flex px-4" style={{ justifyContent: "center" }}>
        <Row className="text-center">
          <Col>
            <h1>Subject Handle BY</h1>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>{currentUser.data.name}</h1>
            <h2 style={{ fontSize: '15px', fontWeight: 'lighter' }}>{currentUser.data.educationalBackground}</h2>
          </Col>
          
        </Row>
      </Container>

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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );

};

export default DisplaySubjects;
