import React from 'react';
import axios from 'axios';


const PositionControl = ({
    baseUrl,
    robotPosition,
    setRobotPosition,
    homePosition,
    setHomePosition,
    tableAPosition,
    setTableAPosition,
    tableBPosition,
    setTableBPosition,
    isCarryingObject,
    isInputReadonly,
    setIsInputReadonly,
    setIsAtDropOff
}) => {

    const handleInitialize = async () => {
        try {
            await axios.post(`${baseUrl}/initialize_robot`, {
                initial_position: [robotPosition.x, robotPosition.y, robotPosition.z],
                home_position: [homePosition.x, homePosition.y, homePosition.z],
                gripper_state: isCarryingObject ? 1 : 0
            });
        } catch (error) {
            console.error("Error initializing robot:", error);
        }
        setIsInputReadonly(true)
    };

    const handleReset = () => {
        setIsInputReadonly(false);
        setIsAtDropOff(false);
    };

    // Handle position updates for the robot
    const handleRobotPositionChange = (axis, value) => {
        setRobotPosition(prev => ({
            ...prev,
            [axis]: parseInt(value)
        }));
    };

    return (
        <div>
            <h2>Pick and Place Simulator</h2>

            <button onClick={handleInitialize}>Initialize</button>
            <button onClick={handleReset}>Reset</button>
            <div>
                <label>
                    Robot Position X:
                    <input
                        type="number"
                        value={robotPosition.x}
                        onChange={(e) => handleRobotPositionChange('x', e.target.value)}
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
                <label>
                    Y:
                    <input
                        type="number"
                        value={robotPosition.y}
                        onChange={(e) => handleRobotPositionChange('y', e.target.value)}
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
                <label>
                    Z:
                    <input
                        type="number"
                        value={robotPosition.z}
                        onChange={(e) => handleRobotPositionChange('z', e.target.value)}
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
            </div>
            <div>
                <label>
                    Table A Position X:
                    <input
                        type="number"
                        value={tableAPosition.x}
                        onChange={(e) =>
                            setTableAPosition({ ...tableAPosition, x: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
                <label>
                    Y:
                    <input
                        type="number"
                        value={tableAPosition.y}
                        onChange={(e) =>
                            setTableAPosition({ ...tableAPosition, y: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
                <label>
                    Z:
                    <input
                        type="number"
                        value={tableAPosition.z}
                        onChange={(e) =>
                            setTableAPosition({ ...tableAPosition, z: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
            </div>
            <div>
                <label>
                    Table B Position X:
                    <input
                        type="number"
                        value={tableBPosition.x}
                        onChange={(e) =>
                            setTableBPosition({ ...tableBPosition, x: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
                <label>
                    Y:
                    <input
                        type="number"
                        value={tableBPosition.y}
                        onChange={(e) =>
                            setTableBPosition({ ...tableBPosition, y: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
                <label>
                    Z:
                    <input
                        type="number"
                        value={tableBPosition.z}
                        onChange={(e) =>
                            setTableBPosition({ ...tableBPosition, z: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
            </div>
            <div>
                <label>
                    Home Position X:
                    <input
                        type="number"
                        value={homePosition.x}
                        onChange={(e) =>
                            setHomePosition({ ...homePosition, x: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
                <label>
                    Y:
                    <input
                        type="number"
                        value={homePosition.y}
                        onChange={(e) =>
                            setHomePosition({ ...homePosition, y: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
                <label>
                    Z:
                    <input
                        type="number"
                        value={homePosition.z}
                        onChange={(e) =>
                            setHomePosition({ ...homePosition, z: parseInt(e.target.value) })
                        }
                        readOnly={isInputReadonly}
                        className={isInputReadonly ? "input-readonly" : "input-editable"}
                    />
                </label>
            </div>
            <div>
                <label
                    style={{
                        color: isCarryingObject ? "red" : "green"
                    }}>
                    Gripper State: {isCarryingObject ? "CLOSED" : "OPEN"}
                </label>
            </div>
        </div>
    );
};

export default PositionControl;
