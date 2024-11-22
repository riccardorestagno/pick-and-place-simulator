from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class GripperState(Enum):
    OPEN = 0
    CLOSED = 1


class RobotRequest(BaseModel):
    initial_position: List[float]
    home_position: List[float]
    gripper_state: GripperState


class MoveHomeRequest(BaseModel):
    speed: int = 50


class MoveToRequest(BaseModel):
    target_position: List[float]
    speed: int = 90


class MoveToResponse(BaseModel):
    current_position: List[float]
    axis_speed: List[float]
    err_msg: Optional[str]
