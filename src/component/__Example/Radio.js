import React, { useState } from 'react';
import { Radio, List } from '@writ/react';
import forThrough from '@writ/utils/for-through';

export const ExampleRadio = () => {
    const [index, setIndex] = useState(0)
    return (
        <>
            <List>
                <List.Head>Radio 组件</List.Head>
                <List.Item><Radio name='baseExample' value='基本用法' /></List.Item>
                <List.Item><Radio name='radioChecked' checked value='默认选中 Radio' /></List.Item>
                <List.Item><Radio name='radioDisabled' disabled value='禁用不可操作的 Radio' /></List.Item>
                <List.Item><Radio name='radioReadonly' readonly value='默认只读 Radio' /></List.Item>
                <List.Item><Radio name='radioDisabledChecked' disabled checked value='选中并禁用 Radio' /></List.Item>
                <List.Item>
                    <Radio.Group checked={index} onChange={index => setIndex(index)}>
                        {forThrough(1, 5, index => (
                            <Radio name='radioExampleGroup' value={'Radio组，我是成员 ' + index} key={index} />
                        ))}
                    </Radio.Group>
                </List.Item>
                <List.Item>当前选中的 Raido 成员是第 {index} 个</List.Item>
            </List>
        </>
    )
}
