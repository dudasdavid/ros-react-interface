import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap"

class CustomHeader extends Component {
    render() {
        return (<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Navbar.Brand href="#home">ROS React interface</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>

                </Nav>

            </Navbar.Collapse>
        </Navbar>);
    }
}

export default CustomHeader;