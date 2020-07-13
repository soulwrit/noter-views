import React, { useState } from 'react';
import { ColorPicker } from '../lib';

export function ExampleColorPicker() {
    const [color, setColor] = useState();
    const style = {
        color,
        fontSize: 24,
        lineHeight: 2
    };

    return (
        <>
            <ColorPicker onSelect={setColor} />
            <div style={style}>选择的颜色</div>
        </>
    );
}