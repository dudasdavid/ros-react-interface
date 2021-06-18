import React, { Component } from 'react';
import { Container } from "react-bootstrap"

class CustomFooter extends Component {
    render() {
        return (<Container className="text-center"><p>David Dudas &copy; 2021</p></Container>);
    }
}

export default CustomFooter;