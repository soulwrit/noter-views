import React, { useState } from 'react';
import { PageTurn, Text, List } from '@writ/react';
import forThrough from '@writ/utils/for-through';

export const ExamplePageTurn = () => {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
        <>
            <List>
                <List.Head>
                    <Text theme='success' value='PageTurn' /> 是一个受控组件，必须提供 <Text theme='warning' value='onChange' />
                    、 <Text value='pageNo' theme='info' /> 和 <Text value='pageSize' theme='info' />，才能够更新视图
                </List.Head>
                {forThrough((pageNo - 1) * pageSize + 1, pageNo * pageSize, value => (
                    <List.Item key={value}> 我就是第<Text value={value} theme='info' />条数据 </List.Item>
                ))}
                <List.Foot>
                    <PageTurn total={100} onChange={(pageNo, pageSize) => {
                        setPageNo(pageNo);
                        setPageSize(pageSize);
                    }} pageNo={pageNo} pageSize={pageSize} />
                </List.Foot>
            </List>
        </>
    )
}
