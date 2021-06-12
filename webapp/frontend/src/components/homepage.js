import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import Carousal from './carousal';
import Sample from './sample';


function Homepage() {
    const bg_sm = {backgroundColor: "lightgrey", opacity: '0.8'};
    return(
        <>
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