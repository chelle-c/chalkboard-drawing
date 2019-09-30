import React, { useState } from 'react';
import './App.css';
import Canvas from './Canvas';
import ColourSelect from './ColourSelect';
import ToolSelect from './ToolSelect';

const App = () => {
    const initalColour: string = '#FFFFFF';
    const initialWeight: number = 3 ;
    const [lineColour, setLineColour] = useState(initalColour);
    const [lineWeight, setLineWeight] = useState(initialWeight);
    const [eraserValue, setEraserValue] = useState(false);
    const [clearCanvas, setClearCanvas] = useState(false);

	const updateColour = (lineColour: string) => {
        setLineColour(lineColour)
	};

	const updateWeight = (lineWeight: number) => {
        setLineWeight(lineWeight)
    };

    const updateCanvasStatus = (emptyCanvas: boolean) => {
        setClearCanvas(emptyCanvas);
    };

    const selectEraser = (eraser: boolean) => {
        setEraserValue(eraser);
    }

	return (
		<div className='App'>
			<h1 className='heading' style={{ textAlign: 'center' }} >Canvas Painting App</h1>
			<div className='main'>
				<div>
					<h3 className='heading'>Colour Selection</h3>
					<div className='colour-guide'>
						<h4>Colours</h4>
                        <ColourSelect 
                            updateColour={updateColour}
                            selectEraser={selectEraser}
                        />
					</div>
                    <h3 className='heading'>Tools</h3>
					<div className='colour-guide'>
						<h4>Brush Size</h4>
						<ToolSelect
                            lineWeight={lineWeight}
                            selectEraser={selectEraser}
							updateWeight={updateWeight}
							updateCanvasStatus={updateCanvasStatus}
						/>
					</div>
				</div>
				<Canvas
					colour={lineColour}
                    weight={lineWeight}
                    eraser={eraserValue}
					emptyCanvas={clearCanvas}
					updateCanvasStatus={updateCanvasStatus}
				/>
			</div>
		</div>
	);
};

export default App;
