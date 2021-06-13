import React, { useState } from 'react';
import { Container, ListGroup, Row, Col, Card, Image, Button, Form, Table } from 'react-bootstrap';
import houseOne from "../assets/house-1.jpeg";
import houseTwo from "../assets/house-2.jpeg";
import houseThree from "../assets/house-3.jpeg";
import houseFour from "../assets/house-4.jpeg";


function Marketplace({ mockData, accounts, marketplace }) {
    //styles
    const bg_sm = { backgroundColor: "lightgrey", opacity: '0.8' };
    const my_image = { objectFit: "cover", marginTop: "10px", height: "300px", width: "310px" }

    const [items, setItems] = useState(mockData);

    const openBuyPage = () => {
        marketplace.projectInfo(0).then(data => {
            console.log(data)
        })
    }

    return (
        <>
            <Container fluid style={bg_sm}>
                <Row>
                    <Col md={7}>
                        <Card>
                            <Card.Header>
                                <h5>Available Bidding Properties</h5>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup as="ul">
                                    {items.map((item, i) => (
                                        <ListGroup.Item key={i} as="li">
                                            <Row>
                                                <Col md={5}>
                                                    <Image thumbnail className="align-self-center" src={item.pImg} alt="house-1" />
                                                </Col>
                                                <Col md={7}>
                                                    <Table bordered condensed>
                                                        <tbody>
                                                            <tr>
                                                                <td>Property Name:</td>
                                                                <td>{item.pName}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Available shares:</td>
                                                                <td>{item.totalSupply}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                    <Row>
                                                        <Col>
                                                            <Button variant="primary" onClick={openBuyPage}>Buy Shares</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5}>
                        <Card style={{ width: '32rem' }}>
                            <Card.Header>
                                <h5>Register</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Are you a participant?" required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label>Ethereum Account Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Address" required />
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
                                        <Form.Control type="text" placeholder="Enter Address" required />
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
    )
}
export default Marketplace;