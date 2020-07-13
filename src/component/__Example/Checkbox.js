import React, { useState } from 'react';
import { Checkbox, Text, Divider } from '../lib';
import forTo from '@writ/utils/for-to';

export function ExampleCheckbox() {
    const [checkbox, setCheckbox] = useState();
    const style = {
        marginRight: 15
    };

    return (
        <>
            <p>
                <Checkbox>我是一个checkbox</Checkbox>
            </p>
            <p>
                <Checkbox label>我是一个checkbox，使用了label</Checkbox>
            </p>
            <p>
                <Divider>这是一组复选框: </Divider>
                <br/>
                <Checkbox.Group onChange={setCheckbox}>{forTo(1, 10, value => {
                    return <Checkbox name={value} key={value} style={style}>成员{value}</Checkbox>
                })}</Checkbox.Group>
            </p>
            <p>
                选中的成员的下标： {checkbox ? checkbox.map(value => <Text key={value} style={style}>第{value}个</Text>) : null}
            </p>
        </>
    );
}