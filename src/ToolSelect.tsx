import React, { useState, useEffect} from 'react';
import { Button, ButtonGroup, Grid, Input, Slider } from '@material-ui/core';

const ToolSelect = (props: { updateWeight: (arg0: number) => void; lineWeight: number; selectEraser: (arg0: boolean) => void; updateCanvasStatus: any }) => {
    const [value, setValue] = useState(props.lineWeight);
    const [eraser, setEraser] = useState(false);

    useEffect(() => {
        setValue(props.lineWeight)
    }, [props]);

    useEffect(() => {
        props.updateWeight(value)
    }, [props, value])

    const handleSliderChange = (event: any, newValue: number | number[]) => {
		if (typeof newValue === 'number') {
            if (value !== newValue) setValue(newValue);
        } else {
            if (value !== newValue[0]) setValue(newValue[0]);
        }
	};

    const handleInputChange = (event: { target: { value: string; }; }) => {
        const convertedValue = Number(event.target.value);
        if (value !== convertedValue) setValue(event.target.value === '' ? 1 : convertedValue );
    }

    const handleBlur = (event: any) => {
        const convertedValue = Number(event.target.value);
		if (value !== convertedValue) {
            if (value <= 0) {
				setValue(1);
			} else if (value > 100) {
				setValue(100);
			}
        }
	};

    return (
		<div className='weightSelect'>
			<Grid container spacing={2} alignItems='center'>
				<Grid item xs>
					<Slider
						value={typeof value === 'number' ? value : 1}
						min={1}
                        onChangeCommitted={handleSliderChange}
					/>
				</Grid>
				<Grid item>
					<Input
						className='weightInput'
						value={typeof value === 'number' ? value : 1}
						margin='dense'
						inputProps={{
							step: 1,
							min: 1,
							max: 100,
							type: 'number'
						}}
						onChange={handleInputChange}
						onBlur={handleBlur}
					/>
				</Grid>
			</Grid>
			<ButtonGroup>
				<Button
					variant='contained'
					onClick={() => props.selectEraser(true)}
				>
					Erase
				</Button>
				<Button
					className='clearCanvasButton'
					variant='contained'
					onClick={() => props.updateCanvasStatus(true)}
				>
					Clear Canvas
				</Button>
			</ButtonGroup>
		</div>
	);
}

export default ToolSelect;