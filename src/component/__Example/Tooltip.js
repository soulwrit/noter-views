import React from 'react';
import { Grid, Tooltip, Tag } from '../lib';

const tooltips = [
    'topLeft', 'top', 'topRight',
    'leftTop', 'rightTop',
    'left', 'right',
    'leftBottom', 'rightBottom',
    'bottomLeft', 'bottom', 'bottomRight',
];
const getGridProps = function (index) {
    let span, className;
    switch (index) {
        case 1:
        case 10:
            span = 4;
            className = 'tar';
            break;
        case 3:
        case 12:
            span = 4;
            className = 'tal';
            break;
        case 2:
        case 11:
            span = 2;
            className = 'tac';
            break;
        default:
            span = 5;
            className = 'tac';
            break;
    }
    return { span, className };
}
export function ExampleTooltip() {
    return (
        <Grid cell={10} style={{ height: 240, width: 600, margin: '50px auto' }}>{
            tooltips.map((value, index) => (
                <Grid key={index} {...getGridProps(index + 1)}>
                    <Tooltip placement={value} title={value} theme='warning'>
                        <Tag onClick={() => { alert('我也可以被点击'); }}>{value}</Tag>
                    </Tooltip>
                </Grid>
            ))
        }</Grid>
    );
}