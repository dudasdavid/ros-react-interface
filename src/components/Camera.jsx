import React, { Component } from 'react';
import Config from "../scripts/config.js"

class Camera extends Component {
    state = {
        ros: null,
        connected: false,
    }

    constructor() {
        super();
        this.init_connection();

        this.view_camera = this.view_camera.bind(this);
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

    componentDidMount() {
        this.view_camera();
    }


    view_camera() {
        var viewer = new window.MJPEGCANVAS.Viewer({
            divID: "camera_div",
            width: 320,
            height: 240,
            host: Config.ROSBRIDGE_SERVER_IP,
            topic: Config.CAMERA_TOPIC,
            interval: 10,
            quality: 10,
        });

    };

    render() {
        return (

            <div id="camera_div">
            </div >

        );
    }
}

export default Camera;