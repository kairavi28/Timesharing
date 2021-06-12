import React, {useState} from 'react';
import {Container, ListGroup, Row, Col, Card , Image, Button, Form, FormControl} from 'react-bootstrap';
import houseOne from "../assets/house-1.jpeg";
import houseTwo from "../assets/house-2.jpeg";
import houseThree from "../assets/house-3.jpeg";
import houseFour from "../assets/house-4.jpeg";

function Marketplace() {
    //styles
    const bg_sm = {backgroundColor: "lightgrey", opacity: '0.8'};
    const my_image = { objectFit: "cover", marginTop: "10px", height: "300px", width: "310px"}

    const [items, setItems] = useState([
        {pid:1, pName:'The Exquisite Beach House in Vancouver',price:3400, totalSupply: 1000, pImg:houseOne},
        {pid:2, pName:'The Royal Villa in Florida',price:2800, totalSupply: 1000, pImg:houseTwo},
        {pid:3, pName:'The Palm Residency in California',price:5200, totalSupply: 1000, pImg:houseThree},
        {pid:4, pName:'Beautiful Luxurious Bunglow in Alberta',price:2000, totalSupply: 1000, pImg:houseFour}
    ]);

    return(
        <>
        <Container fluid style={bg_sm}>
        {/* first card */}
        <Row>
        <Col>
        <Card style={{ width: '24rem' }}>
        <Card.Body>
        <h6>
        <ListGroup as="ul" horizontal>
        {items.map(item => (
            <ListGroup.Item as="li">
                 <Image  className="align-self-center mr-3" src={item.pImg} alt="house-1" style={my_image}/>
                 Property Name: {item.pName}
                 Price: {item.price} CAD
                 <hr></hr>
                 <Button variant="primary">Buy</Button>{' '}
            </ListGroup.Item>
        ))} 
        </ListGroup>
        </h6>
        </Card.Body>
        </Card></Col>
            <Col> 
            <h1>Welcome to Marketplace!</h1>
            <Card style={{ width: '30rem' }} className="align-self-center mr-3">
            <Card.Header>
            <h5>Search Any Project with Project ID</h5>
            </Card.Header>
            <Card.Body>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
            </Card.Body>
            </Card>
            </Col>
        </Row>           
        </Container>
        </>
    )
}
export default Marketplace;