import React, { Component } from 'react';
import Connection from "./Connection.jsx"
import Teleoperation from './Teleoperation.jsx';
import RobotState from './RobotState.jsx'
import Map from './Map.jsx'
import Camera from './Camera.jsx'
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
                            <Row>
                                <Teleoperation />
                            </Row>
                            <Row>
                                <RobotState />
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <h1>CAMERA</h1>
                                <Camera />
                            </Row>
                            <Row>
                                <h1>MAP</h1>
                                <Map />
                            </Row>
                        </Col>

                    </Row>


                </Container>
            </div >

        );
    }
}

export default Home;