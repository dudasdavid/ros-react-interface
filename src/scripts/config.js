const Config = {
    ROSBRIDGE_SERVER_IP: "172.28.177.118",
    ROSBRIDGE_SERVER_PORT: "9090",
    RECONNECTION_TIME: 3000,
    //CMD_VEL_TOPIC: "/turtle1/cmd_vel",
    CMD_VEL_TOPIC: "/cmd_vel",
    ODOM_TOPIC: "/odom",
    POSE_TOPIC: "/amcl_pose",
    CAMERA_TOPIC: "/camera/rgb/image_raw",
}

export default Config;