import React, { Component } from 'react';
import { Joystick } from 'react-joystick-component';
import Config from "../scripts/config.js"

class Teleoperation extends Component {
    state = {
        ros: null,
        connected: false,
    }

    constructor() {
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
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

    handleMove(event) {
        console.log("handle move");
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist"
        });

        var twist = new window.ROSLIB.Message({
            linear: {
                x: event.y / 100,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: -event.x / 100,
            }
        });

        cmd_vel.publish(twist);
    }
    handleStop(event) {
        console.log("handle stop")
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist"
        });

        var twist = new window.ROSLIB.Message({
            linear: {
                x: 0,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: 0,
            }
        });

        cmd_vel.publish(twist);
    }

    render() {
        return (<div>
            <Joystick size={100} baseColor="#EEEEEE" stickColor="#BBBBBB" move={this.handleMove} stop={this.handleStop}></Joystick>
        </div>);
    }
}

export default Teleoperation;