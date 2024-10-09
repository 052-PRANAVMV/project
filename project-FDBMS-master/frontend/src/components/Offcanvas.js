import { useState } from 'react';
import { Container,Row,ListGroup, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars ,FaBookReader,FaSwatchbook,FaCertificate,FaAward,FaAddressCard,FaMoneyBill,FaScroll,FaBook} from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

function Example() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clickCertificateHandle = () =>{
      navigate('/Certificates')
  }

  return (
    <>
    <Container>
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button variant="link" onClick={handleShow}>
            <FaBars size={30} />
          </Button>
        </Col>
      </Row>
    </Container>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Modify</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup>
          <ListGroup.Item  onClick={() => navigate('/profile')}>
            <CgProfile size={30}/>&nbsp;Profile
          </ListGroup.Item>
            <ListGroup.Item  onClick={() => navigate('/modifySubject')}>
            <FaBookReader size={30} />&nbsp;Subjects Handled
            </ListGroup.Item>
            <ListGroup.Item onClick={()=> navigate('/Publications')}>
            <FaSwatchbook size={30} />&nbsp;Publications
            </ListGroup.Item>
            <ListGroup.Item   onClick={clickCertificateHandle}>
            <FaCertificate size={30} />&nbsp;Certifications
            </ListGroup.Item>
            <ListGroup.Item onClick={() => navigate('/modifyAwards')}>
            <FaAward size={30} />&nbsp;Awards
            </ListGroup.Item>
            <ListGroup.Item onClick={()=> navigate('/modifyEvents')}>
            <FaAddressCard size={30} />&nbsp;Events Handled
            </ListGroup.Item>
            <ListGroup.Item  onClick={()=> navigate('/FundedProject')}>
            <FaMoneyBill size={30} />&nbsp;Funded Project Proposals(FPP)
            </ListGroup.Item>
            <ListGroup.Item onClick={() => navigate('/modifyPatent')}>
            <FaScroll size={30} />&nbsp;Patents
            </ListGroup.Item>
            <ListGroup.Item onClick={()=> navigate('/modifyBook')}>
            <FaBook size={30} />&nbsp;Books
            </ListGroup.Item>
    </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;