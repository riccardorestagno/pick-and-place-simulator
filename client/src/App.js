import React, { useState } from 'react';

import PositionControl from './components/PositionControl';
import RobotControl from './components/RobotControl';
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

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <PositionControl
        baseUrl={baseUrl}
        robotPosition={robotPosition}
        setRobotPosition={setRobotPosition}
        homePosition={homePosition}
        setHomePosition={setHomePosition}
        tableAPosition={tableAPosition}
        setTableAPosition={setTableAPosition}
        tableBPosition={tableBPosition}
        setTableBPosition={setTableBPosition}
        isCarryingObject={isCarryingObject}
        isInputReadonly={isInputReadonly}
        setIsInputReadonly={setIsInputReadonly}
        setIsAtDropOff={setIsAtDropOff}
      />
      <div>
        <LayoutCanvas
          robotPosition={robotPosition}
          tableAPosition={tableAPosition}
          tableBPosition={tableBPosition}
          isCarryingObject={isCarryingObject}
          isAtDropOff={isAtDropOff}
          isInputReadonly={isInputReadonly}
        />
        <RobotControl
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
