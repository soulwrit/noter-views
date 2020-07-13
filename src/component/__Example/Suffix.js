import React, { useRef } from 'react';
import { Suffix, Tag } from '@writ/react';
import forThrough from '@writ/utils/for-through';

export const ExampleSuffix = () => {
    const wrapperRef = useRef();
    const listWrapperStyle = {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    };

    return (
        <div style={listWrapperStyle} ref={wrapperRef}>
            {forThrough(1, 500, value => (
                <p key={value}>这是很长的列表，列表项很多，这是编号：{value}，固钉被定位在右下角</p>
            ))}
            <Suffix backTop={wrapperRef}>
                <Tag> CUS </Tag>
            </Suffix>
        </div>
    );
};
