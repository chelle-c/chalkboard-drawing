import React, { useCallback, useEffect, useRef, useState } from 'react';
import createIcon from './img/materialcreateiconoutline.png';
import eraseIcon from './img/eraser-variant.svg';

type Coordinates = {
    x: number;
    y: number;
};

const Canvas = (props: { colour: string; weight: number; eraser: boolean; emptyCanvas: boolean; updateCanvasStatus: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinates | undefined>(undefined);

    // Get the coordinates of the mouse compared to the canvas
    const getCoordinates = (event: MouseEvent): Coordinates | undefined => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX) - rect.left,
            y: (event.clientY + 18) - rect.top
        };
    };

    const getCursorIcon = () => {
        return props.eraser ? eraseIcon : createIcon;
    }

    // Check if mouse is inside canvas area
    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, []);

    // Paint on the canvas
    const drawLine = useCallback(
        (originalMousePosition: Coordinates,newMousePosition: Coordinates) => {
            if (!canvasRef.current) {
                return;
            }

            const canvas: HTMLCanvasElement = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {

                context.strokeStyle = props.eraser ? '#131313' : props.colour;

                context.lineJoin = 'round';
                context.lineCap = 'round';
                context.lineWidth = props.weight;

                context.beginPath();
                context.moveTo(originalMousePosition.x, originalMousePosition.y);
                context.lineTo(newMousePosition.x, newMousePosition.y);
                context.closePath();

                context.stroke();
            }
        }, 
        [props]
    )

    // Draw a line on the canvas following the mouse while the left click button is pressed
    const paint = useCallback(
        (event: MouseEvent) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    setMousePosition(newMousePosition);
                    newFunction(drawLine, mousePosition, newMousePosition);
                }
            }
        },
        [isPainting, mousePosition, drawLine]
    );

    // Stop painting
    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);

    // Check for left mouse click
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    // Check if the mouse is moving
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    // Check if left mouse click is released or if the cursor leaves the canvas area
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        if (props.emptyCanvas) {
            const canvas: HTMLCanvasElement = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        return () => {
            props.updateCanvasStatus(false);
        }
    }, [props])

    // Create canvas
    return (
        <div style={{ cursor: `url(${getCursorIcon()}), crosshair` }}>
			<canvas ref={canvasRef} width={900} height={850} />
		</div>
    );
};

export default Canvas;
function newFunction(drawLine: (originalMousePosition: Coordinates, newMousePosition: Coordinates) => void, mousePosition: Coordinates, newMousePosition: Coordinates) {
    drawLine(mousePosition, newMousePosition);
}

