import React from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { FaAddressCard, FaArrowRight,FaBookReader ,FaSwatchbook,FaCertificate,FaAward,FaScroll, FaBook, FaMoneyBill} from 'react-icons/fa';
import '../styles/Cardanimation.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Tabs() {

    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)

    const handlenavigation = (route) =>{
        navigate(route);
    }

    const Cardset = [
      
        { title: 'Subjects Handled', icon: <FaBookReader size={30} />, desc: `View Subjects handled by ${currentUser.data.name}`,route:'/subject' },
        { title: 'Publications', icon: <FaSwatchbook size={30} />, desc: `View Publications by ${currentUser.data.name}`,route:'/publication' },
        { title: 'Certifications', icon: <FaCertificate size={30} />, desc: `View Certifications of ${currentUser.data.name}` ,route:'/displayCertificate'},
        { title: 'Awards', icon: <FaAward size={30} />, desc: `View Awards of ${currentUser.data.name}`,route:'/award' },
        { title: 'Events Handled', icon: <FaAddressCard size={30} />, desc: `View Events handled by ${currentUser.data.name}`,route:'/eventHandled' },
        { title: 'F P P', icon: <FaMoneyBill size={30} />, desc: `View Funded Project Proposals by ${currentUser.data.name}`,route:'/fpp' },
        { title: 'Patents', icon: <FaScroll size={30} />, desc: `View Patent rights of ${currentUser.data.name}`,route:'/patent' },
        { title: 'Books', icon: <FaBook size={30} />, desc: `View Books by ${currentUser.data.name}`,route:'/book' }
    ];

    return (
        <Container>
            <Row>
                {Cardset.map((content, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} className='mb-4 mt-4'>
                        <Card className="card-hover d-flex flex-column justify-content-between" style={{ height: '200px'}}>
                            <Card.Body className="d-flex flex-column">
                                <Row className="mb-3">
                                    <Col style={{ maxWidth: '20%', flex: '0 0 20%', display: 'flex', alignItems: 'center' }}>
                                        {content.icon}
                                    </Col>
                                    <Col>
                                        <Card.Title className="d-flex align-items-center">{content.title}</Card.Title>
                                    </Col>
                                </Row>
                                <Row className="flex-grow-1 mb-3">
                                    <Col>{content.desc}</Col>
                                </Row>
                                <Row className='d-flex justify-content-center'>
                                    <Button className='primary mt-auto' style={{width:'150px'}} onClick={()=>handlenavigation(content.route)}>
                                        View More &nbsp; <FaArrowRight size={15} />
                                    </Button>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Tabs;