import React, { useState } from 'react';
import { Grid, Text, Select } from '@writ/react';
import forThrough from '@writ/utils/for-through';
import rgbRandomGen from '@writ/utils/rgb-random-gen';

export function ExampleGrid() {
    const [dir, setDir] = useState('ltr');
    return (
        <>
            <Text type='h3' value='九宫格' />
            <div style={{ width: 300 }}>
                <Select onChange={any => setDir(any[0].value)} value={dir}>
                    <Select.Option value='ltr'>ltr</Select.Option>
                    <Select.Option value='rtl'>rtl</Select.Option>
                    <Select.Option value='ttr'>ttr</Select.Option>
                    <Select.Option value='rtt'>rtt</Select.Option>
                </Select>
            </div>
            <Grid dir={dir} style={{ height: 300, width: 300 }}>{forThrough(1, 9, value => (
                <Grid span={3} key={value} style={{ backgroundColor: rgbRandomGen(), color: '#fff' }}>{value}</Grid>
            ))}</Grid>
        </>
    )
}
