import React, { useState, useRef, useEffect } from 'react';
import { Text } from '@writ/react';

// useEffect ==  类似于componentDidMount componentDidUpdate componentWillUnmount 
// useEffect 首次渲染：componentDidMount 将第二个参数设置为一个空数组则只会在componentDidMount中执行
//           每次更新：componentDidUpdate 
//           返回函数：componentWillUnmount 
function Ref(props) {
    const { dref, children } = props;

    return React.createElement('div', {
        ref: dref,
        children: children
    });
}

export function ExampleHooks() {
    const [count, setCount] = useState(0);
    const ref = useRef();

    useEffect(() => {
        console.log(ref.current.innerHTML);
    });

    return (
        <div>
            <Text type='h1' value='Example Hooks' />
            <p> 你点击按钮的次数 {count}</p>
            <button onClick={() => setCount(count + 1)}>
                点我
            </button>

            <Ref dref={ref}>111</Ref>
        </div>
    );
}