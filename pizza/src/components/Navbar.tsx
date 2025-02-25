import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Pizzéria
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">
                        Pizzák
                    </Nav.Link>
                    <Nav.Link as={Link} to="/kosar">
                        Kosár
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
