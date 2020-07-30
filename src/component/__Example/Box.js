import React, { useState } from 'react';
import { Box, Radio } from '@writ/react';
import forTo from '@writ/utils/for-to';

export function ExampleBox() {
    const dirs = ['ltr', 'rtl', 'ttr', 'rtt'];
    const [dir, setDir] = useState(dirs[0]);
    const style = {
        backgroundColor: '#007bff',
        color: '#fff'
    };

    return (
        <>
            <p>
                列的走向：{<Radio.Group name='dir' onChange={i => setDir(dirs[i])}>{dirs.map(value => (
                    <Radio key={value} value={value} />
                ))}</Radio.Group>}
            </p>
            <Box>
                <Box.Row dir={dir}>{forTo(1, 12, col => (
                    <Box.Col key={col} span={col}>
                        <p style={style}> {col}/{12} </p>
                    </Box.Col>
                ))}</Box.Row>
            </Box>
        </>
    );
}