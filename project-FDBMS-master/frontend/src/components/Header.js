import React from 'react';
import { Navbar, Nav,  Button, Container,DropdownButton, DropdownHeader,Dropdown } from 'react-bootstrap';
import logo from "../images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)

  const handleGetStartClick = () => {
    navigate('/facultyLogin'); 
  };

  const handleSignup = () => {
    navigate('/adminLogin'); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt='logo'className='logo'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-secondary">Home</Nav.Link>
            <Nav.Link href="#features" className="text-white">Features</Nav.Link>
            <Nav.Link href="#about" className="text-white">About</Nav.Link>
            <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
          </Nav>
          
          <div className="text-end">
            {currentUser ? (
              <DropdownButton id="dropdown-button" title="Sign-Out" style={{ padding: '5px 10px', fontSize: '12px' ,width:'150' }} >
                
                <Dropdown.Item><Link to={'/dashboard'}>Profile</Link>  </Dropdown.Item>
                 <Dropdown.Item><Link to={'/'}>Sign-Out</Link>  </Dropdown.Item>
              </DropdownButton>
            ): 
            ( <div>
              <Button variant="outline-light" className="me-2 custom-button"  onClick={handleGetStartClick} >Login</Button>
              <Button variant="warning" className="custom-button"  onClick={handleSignup} >Sign-up</Button> 
              </div> ) }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;