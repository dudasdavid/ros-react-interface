import React, { Component } from 'react';
import { Row, Col, } from "react-bootstrap"
import Config from "../scripts/config.js"
import * as Three from "three"

class RobotState extends Component {
    state = {
        x: 0,
        y: 0,
        theta: 0,
        x_vel: 0,
        theta_vel: 0,
        ros: null,
        connected: false,
    };


    constructor() {
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection established!");
            this.setState({ connected: true });
        });

        this.state.ros.on("close", () => {
            console.log("connection closed!");
            this.setState({ connected: false });

            this.setState({ x: NaN });
            this.setState({ y: NaN });
            this.setState({ theta: NaN });
            this.setState({ x_vel: NaN });
            this.setState({ theta_vel: NaN });

            // try to reconnect
            setTimeout(() => {
                try {
                    this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT);
                } catch (error) {
                    console.log("connection error");
                }
            }, Config.RECONNECTION_TIME);
        });

        this.state.ros.on("error", () => {
            console.log("error!");
        });


        try {
            this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT);
        } catch (error) {
            console.log("connection error");
        }


    }

    componentDidMount() {
        this.getRobotState();
    }

    getRobotState() {
        // create a pose subscriber
        var pose_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.POSE_TOPIC,
            messageType: "geometry_msgs/PoseWithCovarianceStamped",
        });

        // create a pose callback
        pose_subscriber.subscribe((message) => {
            this.setState({ x: message.pose.pose.position.x.toFixed(3) });
            this.setState({ y: message.pose.pose.position.y.toFixed(3) });
            this.setState({ theta: this.getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(1) });
        });

        // create a velocity subscriber
        var vel_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.ODOM_TOPIC,
            messageType: "nav_msgs/Odometry",
        });

        // create a velocity callback
        vel_subscriber.subscribe((message) => {
            this.setState({ x_vel: message.twist.twist.linear.x.toFixed(3) });
            this.setState({ theta_vel: message.twist.twist.angular.z.toFixed(3) });
        });

    }

    getOrientationFromQuaternion(ros_orientation_quaternion) {
        var q = new Three.Quaternion(ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w);

        // convert to Euler angles
        var rpy = new Three.Euler().setFromQuaternion(q);
        return rpy["_z"] * (180 / Math.PI);
    }

    render() {
        return (

            <div>
                <Row>
                    <Col>
                        <h4 className="mt-4">Position:</h4>
                        <p className="mt-0">x: {this.state.x}</p>
                        <p className="mt-0">y: {this.state.y}</p>
                        <p className="mt-0">Orientation: {this.state.theta}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className="mt-4">Velocities:</h4>
                        <p className="mt-0">x: {this.state.x_vel}</p>
                        <p className="mt-0">z: {this.state.theta_vel}</p>
                    </Col>
                </Row>
            </div >

        );
    }
}

export default RobotState;