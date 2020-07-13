import React, { useState } from 'react';
import { InputNumber, Button, Icon } from '@writ/react';

export const ExampleInputNumber = () => {
    const formatter = '{0,2}~{3,5}%';
    const [value, setValue] = useState();
    const [format, setFormat] = useState();
    const [isVertical, setIsVertical] = useState();

    return (
        <div>
            <InputNumber
                onChange={(value, fmt) => {
                    setValue(value);
                    setFormat(fmt);
                }}
                min={-10} max={1000000000}
                formatter={formatter}
                isVertical={isVertical}
            />
            <p>原始输入：{value} </p>
            <p>模板格式化：{format} （{formatter}, 这是一个测试性功能，有待完善）</p>
            <p><Button onClick={() => setIsVertical(!isVertical)}>垂直布局</Button></p>
        </div>
    )
}
