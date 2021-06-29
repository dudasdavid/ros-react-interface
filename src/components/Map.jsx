import React, { Component } from 'react';
import Config from "../scripts/config.js"

class Map extends Component {
    state = {
        ros: null,
        connected: false,
    }

    constructor() {
        super();
        this.init_connection();

        this.view_map = this.view_map.bind(this);
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
        this.view_map();
    }


    view_map() {
        var viewer = new window.ROS2D.Viewer({
            divID: "nav_div",
            width: 320,
            height: 240,
        });

        var navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            serverName: "/move_base",
            withOrientation: true,
        });

    };

    render() {
        return (

            <div id="nav_div">
            </div >

        );
    }
}

export default Map;