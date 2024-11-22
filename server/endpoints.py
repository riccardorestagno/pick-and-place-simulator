from fastapi import APIRouter
from models import RobotRequest, MoveHomeRequest, MoveToRequest, MoveToResponse
from robot_sim import Robot

router = APIRouter()
robot = Robot()


@router.post("/initialize_robot")
async def initialize_robot(request: RobotRequest):
    global robot
    robot = Robot(
        initial_position=request.initial_position,
        home_position=request.home_position,
        gripper_state=request.gripper_state
    )
    return {"message": "Robot initialized successfully", "robot": robot.__dict__}


@router.post("/move_home", response_model=MoveToResponse)
async def move_home(request: MoveHomeRequest):
    current_position, axis_speed, err_msg = robot.move_home(request.speed)
    return MoveToResponse(
        current_position=current_position,
        axis_speed=axis_speed,
        err_msg=err_msg
    )


@router.post("/move_to", response_model=MoveToResponse)
async def move_to(request: MoveToRequest):
    current_position, axis_speed, err_msg = robot.move_to(request.target_position, request.speed)
    return MoveToResponse(
        current_position=current_position,
        axis_speed=axis_speed,
        err_msg=err_msg
    )
