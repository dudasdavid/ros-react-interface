import React, { Component } from 'react';
import Connection from "./Connection.jsx"
import Teleoperation from './Teleoperation.jsx';
import { Row, Col, Container, Button } from "react-bootstrap"

class Home extends Component {
    state = {
    };

    render() {
        return (

            <div>
                <Container>
                    <h1 className="text-center mt-3">Control panel</h1>
                    <Row>
                        <Col>
                            <Connection />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Teleoperation />
                        </Col>
                        <Col>
                            <h3>MAP</h3>
                        </Col>
                    </Row>

                </Container>
            </div >

        );
    }
}

export default Home;