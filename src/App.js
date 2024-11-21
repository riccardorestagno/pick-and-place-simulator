import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './App.css';

const PickAndPlaceSimulator = () => {
  const baseUrl = "http://127.0.0.1:8000";
  const canvasRef = useRef(null);
  const [robotPosition, setRobotPosition] = useState({ x: 100, y: 100, z: 0 });
  const [tableAPosition, setTableAPosition] = useState({ x: 50, y: 50, z: 0 });
  const [tableBPosition, setTableBPosition] = useState({ x: 250, y: 250, z: 0 });
  const [homePosition, setHomePosition] = useState({ x: 150, y: 150, z: 0 });
  const [isCarryingObject, setIsCarryingObject] = useState(false);
  const [isAtDropOff, setIsAtDropOff] = useState(false);
  const [isInputReadonly, setIsInputReadonly] = useState(false);


  // Draw the layout on the canvas
  const drawLayout = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Room Boundary
    ctx.strokeStyle = '#003f87';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 400, 400);

    // Draw Table A
    ctx.fillStyle = '#1e90ff';
    ctx.fillRect(tableAPosition.x, tableAPosition.y, 50, 50);
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText('Table A', tableAPosition.x + 5, tableAPosition.y + 30);

    // Draw Table B
    ctx.save();
    ctx.translate(tableBPosition.x + 25, tableBPosition.y + 25);
    ctx.rotate(45 * Math.PI / 180);
    ctx.fillStyle = '#1e90ff';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.restore();
    ctx.fillStyle = 'white';
    ctx.fillText('Table B', tableBPosition.x + 5, tableBPosition.y + 30);

    // Draw Robot
    ctx.beginPath();
    ctx.arc(robotPosition.x, robotPosition.y, 20, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'green';
    ctx.font = '12px Arial';
    ctx.fillText('Robot', robotPosition.x - 15, robotPosition.y + 5);

    // Draw object if robot is carrying it
    if (isCarryingObject) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(robotPosition.x, robotPosition.y - 25, 10, 0, Math.PI * 2, true);
      ctx.fill();
    } else {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      if (isAtDropOff) {
        ctx.arc(tableBPosition.x + 15, tableBPosition.y + 10, 10, 0, Math.PI * 2, true);
      } else {
        ctx.arc(tableAPosition.x + 15, tableAPosition.y + 10, 10, 0, Math.PI * 2, true);
      }
      ctx.fill();
    }
  };

  useEffect(() => {
    drawLayout();
  }, [robotPosition, tableAPosition, tableBPosition, isCarryingObject, isAtDropOff, isInputReadonly]);

  // Handle position updates for the robot
  const handleRobotPositionChange = (axis, value) => {
    setRobotPosition(prev => ({
      ...prev,
      [axis]: parseInt(value)
    }));
  };

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
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div>
        <h2>Pick and Place Simulator</h2>
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
        <button onClick={handleInitialize}>Initialize</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid black' }}></canvas>
        <div></div>
        <button onClick={handlePickAndPlace} disabled={!isInputReadonly}>Pick and Place</button>
        <button onClick={handleMoveHome} disabled={!isInputReadonly}>Move Home</button>
      </div>
    </div>
  );
};

export default PickAndPlaceSimulator;
