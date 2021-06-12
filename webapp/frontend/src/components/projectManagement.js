import React from 'react';
import {Container, Accordion, Modal, Form, ListGroup, Row, Col, Card , Image, Button} from 'react-bootstrap';
import houseOne from "../assets/house-1.jpeg";
import houseTwo from "../assets/house-2.jpeg";
import houseThree from "../assets/house-3.jpeg";
import houseFour from "../assets/house-4.jpeg";
import { useEffect, useState } from 'react';


const ProjManagement = () => {
    //styles
    const bg_sm = {backgroundColor: "lightgrey", opacity: '0.8'};
    const my_image = { objectFit: "cover", marginTop: "10px", height: "300px", width: "310px"}
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
return(
<>
<Container fluid style={bg_sm}> 
<Accordion>
    <h2>PROJECTS </h2>
    <Button variant="primary" onClick={handleShow}>Create New Project</Button>{' '}
    <Modal show={show} onHide={handleClose} animation={false}>
           <Modal.Header closeButton>
             <Modal.Title>Create New Project</Modal.Title>
           </Modal.Header>
           <Modal.Body>
           <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Project Name"/>
                <Form.Label>Price </Form.Label>
                <Form.Control type="text" placeholder="Enter Price"/>
                <Form.Label>Token Supply</Form.Label>
                <Form.Control type="text" placeholder="Enter Token Supply"/>
            </Form.Group>
            </Form>
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
               Close
             </Button>
             <Button variant="primary" onClick={handleClose}>
               Add Project
             </Button>
           </Modal.Footer>
    </Modal>
    <hr></hr>
    <Row>
    {/* first card */}
    <Col>
    <Card style={{ width: '22rem' }}>
    <Card.Header>
      <Image  className="align-self-center mr-3" src={houseOne} alt="house-1" style={my_image}/>
      </Card.Header>
      <Card.Body>
      <h6>
      <ListGroup variant="flush">
        <ListGroup.Item>Property Name: The Exquisite Beach House in Vancouver</ListGroup.Item>
        <ListGroup.Item>Price: 1024 CAD</ListGroup.Item>
        <ListGroup.Item>Total Supply: 1000 Tokens</ListGroup.Item>
      </ListGroup>
      </h6>
      <Button variant="primary">Add To Project</Button>{' '}
      </Card.Body>
    </Card>
    </Col>
    {/* second card */}
    <Col>
    <Card style={{ width: '22rem' }}>
    <Card.Header>
      <Image  className="align-self-center mr-3" src={houseTwo} alt="house-2" style={my_image}/>
      </Card.Header>
      <Card.Body>
      <h6>
      <ListGroup variant="flush">
        <ListGroup.Item>Property Name: The Royal Villa in Florida</ListGroup.Item>
        <ListGroup.Item>Price: 1024 CAD</ListGroup.Item>
        <ListGroup.Item>Total Supply: 1000 Tokens</ListGroup.Item>
      </ListGroup>
      </h6>
      <Button variant="primary">Add To Project</Button>{' '}
      </Card.Body>
    </Card>
    </Col>
    {/* Third card */}
    <Col>
    <Card style={{ width: '22rem' }}>
    <Card.Header>
      <Image  className="align-self-center mr-3" src={houseThree} alt="house-3" style={my_image}/>
      </Card.Header>
      <Card.Body>
      <h6>
      <ListGroup variant="flush">
        <ListGroup.Item>Property Name: The Palm Residency in California</ListGroup.Item>
        <ListGroup.Item>Price: 1024 CAD</ListGroup.Item>
        <ListGroup.Item>Total Supply: 1000 Tokens</ListGroup.Item>
      </ListGroup>
      </h6>
      <Button variant="primary">Add To Project</Button>{' '}
      </Card.Body>
    </Card>
    </Col>
    {/* Fourth card */}
    <Col>
    <Card style={{ width: '22rem' }}>
    <Card.Header>
      <Image  className="align-self-center mr-3" src={houseFour} alt="house-4" style={my_image}/>
      </Card.Header>
      <Card.Body>
      <h6>
      <ListGroup variant="flush">
        <ListGroup.Item>Property Name: Beautiful Luxurious Bunglow in Alberta</ListGroup.Item>
        <ListGroup.Item>Price: 1024 CAD</ListGroup.Item>
        <ListGroup.Item>Total Supply: 1000 Tokens</ListGroup.Item>
      </ListGroup>
      </h6>
      <Button variant="primary">Add To Project</Button>{' '}
      </Card.Body>
    </Card>
    </Col>
    </Row>
</Accordion>
</Container>
</>
);
}

export default ProjManagement;

