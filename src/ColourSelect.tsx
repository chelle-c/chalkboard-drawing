import React from 'react';

const ColourSelect = (props: { updateColour: (arg0: string) => void; selectEraser: (arg0: boolean) => void; }) => {

    const colours = [
		'#ffffff',
        '#d6d6d6',
        '#acb8dc',
        '#acc7dc',
        '#98dfd4',
        '#92e1ab',
        '#ecf2ae',
		'#f0c987',
		'#e6a785',
		'#ee9292',
        '#ee92c2',
        '#cf9de6'
    ];

    const changeColour = (newColour: string) => { 
        return props.updateColour(newColour);
    }

    const displayButtons = colours.map((colour, index) => { return <button key={index} className={'colourButton'} style={{ background: colour }} onClick={() => { changeColour(colour); props.selectEraser(false) }} ></button>; })

    return (
		<div className='colourSelect'>
            {displayButtons}
		</div>
	);
}

export default ColourSelect;