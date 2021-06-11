import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import Carousal from './carousal';
import Sample from './sample';

function Homepage() {
    const bg_sm = {backgroundColor: "lightgrey", opacity: '0.8'};
    return(
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Timesharing</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#wallet">Wallet</Nav.Link>
              <Nav.Link href="#bidding">Bidding</Nav.Link>
              <Nav.Link href="#portfolio">Portfolio</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
          <Container fluid style={bg_sm}>
              <Row>
              <Container>
              <Carousal/>  
              </Container> 
              </Row>
          </Container>
        </>
        );
}


export default Homepage;