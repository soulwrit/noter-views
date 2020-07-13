import React, { useRef } from 'react';
import { Table } from '@writ/react'; 

export const ExampleTable = () => {
    const listWrapperStyle = {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    };
    const wrapperRef = useRef();
    const columns = [
        {
            key: 'name',
            value: '姓名',
        },
        {
            key: 'age',
            value: '年龄',
        },
        {
            key: 'tel',
            value: '电话',
        },
        {
            key: 'mark',
            value: '备注',
        },
    ];
    const source = [
        {
            name: '田大人',
            age: 31,
            tel: 12345678909,
            mark: '这是一个自恋的人'
        },
    ];

    return (
        <div style={listWrapperStyle} ref={wrapperRef}>
            <Table columns={columns} source={source}></Table>
        </div>
    );
};
