import React from 'react'
import Profilesection from '../components/profilesection'
import  Tabs  from '../components/Tabs';


import { Container } from 'react-bootstrap';
function DashboardView() {
  return (
    <>
    
    <Profilesection/>
    <Container>
      <hr/>
      <h2 className='text-center'>Quickies</h2>
      <hr/>
    </Container>
    <Tabs/>
    
    </>
  )
}

export default DashboardView