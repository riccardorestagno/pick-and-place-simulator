import React, { useState } from 'react';
import axios from 'axios';

import RobotActions from './components/RobotActions';
import LayoutCanvas from './components/LayoutCanvas';
import './App.css';

const PickAndPlaceSimulator = () => {
  const baseUrl = "http://127.0.0.1:8000";
  const [robotPosition, setRobotPosition] = useState({ x: 100, y: 100, z: 0 });
  const [tableAPosition, setTableAPosition] = useState({ x: 50, y: 50, z: 0 });
  const [tableBPosition, setTableBPosition] = useState({ x: 250, y: 250, z: 0 });
  const [homePosition, setHomePosition] = useState({ x: 150, y: 150, z: 0 });
  const [isCarryingObject, setIsCarryingObject] = useState(false);
  const [isAtDropOff, setIsAtDropOff] = useState(false);
  const [isInputReadonly, setIsInputReadonly] = useState(false);


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
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
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
      <div>

      </div>
      <div>
        <LayoutCanvas
          robotPosition={robotPosition}
          tableAPosition={tableAPosition}
          tableBPosition={tableBPosition}
          isCarryingObject={isCarryingObject}
          isAtDropOff={isAtDropOff}
          isInputReadonly={isInputReadonly}
        />
        <RobotActions
          baseUrl={baseUrl}
          tableAPosition={tableAPosition}
          tableBPosition={tableBPosition}
          setRobotPosition={setRobotPosition}
          isInputReadonly={isInputReadonly}
          setIsCarryingObject={setIsCarryingObject}
          setIsAtDropOff={setIsAtDropOff}
        />
      </div>
    </div>
  );
};

export default PickAndPlaceSimulator;
