import React, { useState } from 'react';
import { Container, Row, Card, Col, ListGroup, Table, Form, Image, Button } from 'react-bootstrap';
import houseOne from "../assets/house-1.jpeg"
import houseTwo from "../assets/house-2.jpeg"
import houseThree from "../assets/house-3.jpeg"
import houseFour from "../assets/house-4.jpeg"
import ContractHelper from './_ContractHelper';

const mockData = [
    { pid: 1, pName: 'The Exquisite Beach House in Vancouver', price: 3400, totalSupply: 1000, pImg: houseOne },
    { pid: 2, pName: 'The Royal Villa in Florida', price: 2800, totalSupply: 1000, pImg: houseTwo },
    { pid: 3, pName: 'The Palm Residency in California', price: 5200, totalSupply: 1000, pImg: houseThree },
    { pid: 4, pName: 'Beautiful Luxurious Bunglow in Alberta', price: 2000, totalSupply: 1000, pImg: houseFour }
];

let marketplace, accounts;
const initContract = async () => {
    const contracts = await ContractHelper.init();
    marketplace = await contracts.Marketplace.deployed();
    accounts = await ContractHelper.getAccounts();

    mockData.forEach(item => {
        marketplace.createBidding(item.pName, {from: accounts[0]});
    })
}

initContract();

const Bidding = () => {
    const bg_sm = { backgroundColor: "lightgrey", opacity: '0.8' };
    const my_image = { objectFit: "cover", marginTop: "10px", height: "400px", width: "400px" }
    const center_body = { marginTop: "10%", marginLeft: "10%", width: "80%" }
    const ListFont = { fontSize: '20px' }
    const [items, setItems] = useState(mockData);

    const bid = (item, i) => {
        const callBid = async () => {
            await marketplace.bid(i, 5, {from: accounts[0]}); //TODO: change from
        }

        callBid();
    }

    const updateTokenNums = (item, e) => {
        e.preventDefault();
        item.tokens = e.target.value;
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
                                                                <td>Price:</td>
                                                                <td>${item.price}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Control value={item.tokens} onChange={e => updateTokenNums(item, e)} type="text" placeholder="Spending Tokens" required />
                                                        </Col>

                                                        <Col md={{ md: 6 }}>
                                                            <Button variant="primary" onClick={() => bid(item, i)}>Send Request</Button>
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
    );
}

export default Bidding;