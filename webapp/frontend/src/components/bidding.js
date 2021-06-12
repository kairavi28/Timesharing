import {Container, Row, Col, Media, Form, Image, Button } from 'react-bootstrap';
import houseOne from "../assets/house-1.jpeg"
import houseTwo from "../assets/house-2.jpeg"
import houseThree from "../assets/house-3.jpeg"
import houseFour from "../assets/house-4.jpeg"


const Bidding = () => {
    const bg_sm = {backgroundColor: "lightgrey", opacity: '0.8'};
    const my_image = { objectFit: "cover", marginTop: "10px", height: "400px", width: "400px"}
    const center_body = {marginTop: "10%",  marginLeft: "10%",  width: "80%" }
    
    return (
       <>
       <Container fluid style={bg_sm}>
           <Row>
           <Container>
            <Media>
                <Media left>
                    <Image  className="align-self-center mr-3" src={houseOne} alt="house-1" style={my_image}/>
                </Media>
                <Media body style={center_body} >
                <Form >
                    <Row>
                        <Col>
                        <Form.Control placeholder="Bid Amount" />
                        </Col>
                        <Col>
                        <Button variant="primary" type="submit">
                            Submit Bid
                        </Button>
                        </Col>
                    </Row>
                </Form>
                </Media>
            </Media>
            <Media>
                <Media left>
                    <Image  className="align-self-center mr-3" src={houseTwo} alt="house-1" style={my_image}/>
                </Media>
                <Media body style={center_body}>
                <Form >
                    <Row>
                        <Col>
                        <Form.Control placeholder="Bid Amount" />
                        </Col>
                        <Col>
                        <Button variant="primary" type="submit">
                            Submit Bid
                        </Button>
                        </Col>
                    </Row>
                </Form>
                </Media>
            </Media>
            <Media>
                <Media left>
                    <Image  className="align-self-center mr-3" src={houseThree} alt="house-1" style={my_image}/>
                </Media>
                <Media body style={center_body}>
                <Form >
                    <Row>
                        <Col>
                        <Form.Control placeholder="Bid Amount" />
                        </Col>
                        <Col>
                        <Button variant="primary" type="submit">
                            Submit Bid
                        </Button>
                        </Col>
                    </Row>
                </Form>
                </Media>
            </Media>
            <Media>
                <Media left>
                    <Image  className="align-self-center mr-3" src={houseFour} alt="house-1" style={my_image}/>
                </Media>
                <Media body style={center_body}>
                <Form >
                    <Row>
                        <Col>
                        <Form.Control placeholder="Bid Amount" />
                        </Col>
                        <Col>
                        <Button variant="primary" type="submit">
                            Submit Bid
                        </Button>
                        </Col>
                    </Row>
                </Form>
                </Media>
            </Media>
           </Container> 
           </Row>
       </Container>
     </>
     );
}
 
export default Bidding;