import { Container, Nav, Navbar } from 'react-bootstrap';

function BasicNav(){
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>The Fujirose</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href="#home">Java</Nav.Link>
                    <Nav.Link href="#home">JavaScript</Nav.Link>
                    <Nav.Link href="#home">HTML</Nav.Link>
                    <Nav.Link href="#home">C</Nav.Link>
                    <Nav.Link href="#home">Python</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default BasicNav