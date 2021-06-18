import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap"

class CustomHeader extends Component {
    render() {
        return (<Container><Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Navbar.Brand href="#home">ROS React interface</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>

                </Nav>

            </Navbar.Collapse>
        </Navbar></Container>);
    }
}

export default CustomHeader;