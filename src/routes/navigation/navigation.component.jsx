
import { Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Fragment } from "react";


import "./navigation.styles.scss";

const Navigation = () => {
    return (
        <Fragment>
            <Navbar expand="lg" className="bg-body-tertiary nav-bar-custom">
                <Container>
                    <Navbar.Brand href="/">[+] Hospital</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" active>Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;