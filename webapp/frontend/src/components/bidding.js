import React, {useState} from 'react';
import {Container, Row, Card, Col, ListGroup, Dropdown, ButtonGroup, DropdownButton, Media, Form, Image, Button } from 'react-bootstrap';
import houseOne from "../assets/house-1.jpeg"
import houseTwo from "../assets/house-2.jpeg"
import houseThree from "../assets/house-3.jpeg"
import houseFour from "../assets/house-4.jpeg"

const Bidding = () => {
    const bg_sm = {backgroundColor: "lightgrey",opacity: '0.8'};
    const my_image = { objectFit: "cover", marginTop: "10px", height: "400px", width: "400px"}
    const center_body = {marginTop: "10%",  marginLeft: "10%",  width: "80%" }
    const ListFont = {fontSize: '20px'}
    const [items, setItems] = useState([
        {pid:1, pName:'The Exquisite Beach House in Vancouver',price:3400, totalSupply: 1000, pImg:houseOne},
        {pid:2, pName:'The Royal Villa in Florida',price:2800, totalSupply: 1000, pImg:houseTwo},
        {pid:3, pName:'The Palm Residency in California',price:5200, totalSupply: 1000, pImg:houseThree},
        {pid:4, pName:'Beautiful Luxurious Bunglow in Alberta',price:2000, totalSupply: 1000, pImg:houseFour}
    ]);

    return (
       <>
       <Container fluid style={bg_sm}>
           <Row>
           <Col>
               <Card style={{ width: '30rem' }}>
                <Card.Header>
                    <h5>Available Bidding Properties</h5>
                </Card.Header>
                <Card.Body>
                <ListGroup as="ul">
                {items.map(item => (
                    <ListGroup.Item as="li">
                    <Image  className="align-self-center mr-3" src={item.pImg} alt="house-1" style={my_image}/>
                    <span style={ListFont}>
                        Property Name: {item.pName}
                        <p>Price: {item.price} CAD</p>
                        <p><Form.Group className="mb-3" controlId="formBasicInput">
                        Bidding ID: <Form.Control type="text" placeholder="Enter Bidding Token ID" />
                        Number of Tokens: <Form.Control type="text" placeholder="Enter Number of Tokens You Want to Bid" />
                        </Form.Group></p>
                    </span>
                    <hr></hr>
                    <Button variant="primary">Bid</Button>{' '}
                    </ListGroup.Item>
                    ))} 
                </ListGroup>
                </Card.Body>
            </Card>
            </Col>
            <Col>
               <Card style={{ width: '32rem' }}>
                <Card.Header>
                    <h5>Register</h5>
                </Card.Header>
                <Card.Body>
                <Form>
               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                   <Form.Check type="checkbox" label="Are you a participant?" required/>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicText">
                   <Form.Label>Ethereum Account Address</Form.Label>
                   <Form.Control type="text" placeholder="Enter Address" required/>
                   <Form.Text className="text-muted">
                       Your account address will be used to issue bidding tokens.
                    </Form.Text>
               </Form.Group>
               <Button variant="primary" type="submit"> Register </Button>
               {/* Your Bidding ID is : ... (let the customer know their bidding id) */}
            </Form>
            </Card.Body>
            </Card>
           <hr></hr>
            <Card style={{ width: '32rem' }}>
                <Card.Header>
                    <h5>Services</h5>
                </Card.Header>
                <Card.Body>
                <Form>
               <Form.Group className="mb-3" controlId="formBasicText">
                   <Form.Label>Ethereum Ethereum Account Address (To see your token balance)</Form.Label>
                   <Form.Control type="text" placeholder="Enter Address" required/>
                   <Form.Text className="text-muted">
                       Your account address will be used to issue bidding tokens.
                    </Form.Text>
               </Form.Group>
               <Button variant="primary" type="submit"> See Balance </Button>
               {/* Your Bidding ID is : ... (let the customer know their bidding id) */}
            </Form>
            </Card.Body>
            </Card>
            </Col>
           </Row>
       </Container>
     </>
     );
}
 
export default Bidding;