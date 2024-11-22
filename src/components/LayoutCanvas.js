import React, { useEffect, useRef } from 'react';

const LayoutCanvas = ({
    robotPosition,
    tableAPosition,
    tableBPosition,
    isCarryingObject,
    isAtDropOff,
    isInputReadonly
}) => {
    const canvasRef = useRef(null);

    // Function to draw the layout on the canvas
    const drawLayout = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawing

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
        ctx.rotate(45 * Math.PI / 180); // Rotate Table B by 45 degrees
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

    return (
        <div>
            <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid black' }}></canvas>
        </div>
    );
};

export default LayoutCanvas;
