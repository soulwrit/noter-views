import React from 'react';
import { Icon, Grid } from '@writ/react';
import forTo from '@writ/utils/for-to';

export function ExampleIcon() {
    return (
        <>
            <h1>h1</h1>
            <h2>h2</h2>
            <h3>h3</h3>
            <h4>h4</h4>
            <h5>h5</h5>
            <h6>h6</h6>
            <Grid cell={50}>{forTo(0, 100, i => (
                <Grid span={2} key={i}><Icon type='search' /></Grid>
            ))}</Grid>

        </>
    )
}