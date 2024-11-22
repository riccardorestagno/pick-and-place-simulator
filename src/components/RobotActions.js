import React from 'react';
import axios from 'axios';


const RobotActions = ({
    baseUrl,
    tableAPosition,
    tableBPosition,
    setRobotPosition,
    isInputReadonly,
    setIsCarryingObject,
    setIsAtDropOff
}) => {

    // Function to modify the robots position using the move_to or move_home endpoints
    const executeMove = (endpoint, data, callback) => {
        const fetchPosition = setInterval(async () => {
            try {
                const response = await axios.post(`${baseUrl}/${endpoint}`, data);

                const { current_position, axis_speed, err_msg } = response.data;

                if (err_msg) {
                    console.error("Error:", err_msg);
                    clearInterval(fetchPosition);
                    if (callback) callback();
                    return;
                }

                setRobotPosition({
                    x: current_position[0],
                    y: current_position[1],
                    z: current_position[2],
                });

                // Stop the interval if the robot has reached the target position
                if (axis_speed.every(speed => speed === 0)) {
                    clearInterval(fetchPosition);
                    if (callback) callback();
                }

            } catch (error) {
                console.error("Error moving robot:", error);
                clearInterval(fetchPosition);
                if (callback) callback();
            }
        }, 20); // 20 millisecond refresh rate
    };

    const moveToPosition = (targetPosition, callback) => {
        executeMove('move_to', {
            target_position: [targetPosition.x, targetPosition.y, targetPosition.z],
            speed: 90,
        }, callback);
    };

    const moveHome = (callback) => {
        executeMove('move_home', { speed: 90 }, callback); // No target_position needed
    };

    // Handle Pick and Place Operation
    const handlePickAndPlace = () => {

        // Head to table A
        moveToPosition({ x: tableAPosition.x + 25, y: tableAPosition.y + 25, z: 0 }, () => {
            // Once at table A, "Pick" the object by setting isCarryingObject to true
            setIsCarryingObject(true);

            // Head to table B
            moveToPosition({ x: tableBPosition.x + 25, y: tableBPosition.y + 25, z: 0 }, () => {
                // Once at table B, "Place" the object by setting isCarryingObject to false
                setIsCarryingObject(false);

                // Once at table B, the obect is at the drop-off location so set it to true
                setIsAtDropOff(true);
            });
        });
    };

    const handleMoveHome = async () => {
        moveHome(() => {
            setIsCarryingObject(false);
        });

    };

    return (
        <div>
            <h3>Robot Actions</h3>
            <button onClick={handlePickAndPlace} disabled={!isInputReadonly}>Pick and Place</button>
            <button onClick={handleMoveHome} disabled={!isInputReadonly}>Move Home</button>
        </div>
    );
};

export default RobotActions;
