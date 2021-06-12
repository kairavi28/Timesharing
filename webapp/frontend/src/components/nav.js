
import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

const BaseNav = () => {
    return ( 
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Timesharing</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#wallet">Wallet</Nav.Link>
              <Nav.Link href="bidding">Bidding</Nav.Link>
              <Nav.Link href="#portfolio">Portfolio</Nav.Link>
              <Nav.Link href="project_management">Project Management</Nav.Link>
              <Nav.Link href="marketplace">Marketplace</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
        </>
     );
}
 
export default BaseNav;