import React from 'react';
import { Tag, Divider, alert } from '../lib';

export function ExampleTag() {
    const style = {
        paddingTop: 20
    };
    const status = [
        { key: 'primary', value: '主要' },
        { key: 'success', value: '成功' },
        { key: 'info', value: '信息' },
        { key: 'warning', value: '警告' },
        { key: 'error', value: '错误' },
        { key: 'danger', value: '危险' },
        { key: 'fatal', value: '致命' },
        { key: 'light', value: '轻柔' },
        { key: 'muted', value: '柔和' },
        { key: 'dark', value: '暗黑' },
        { key: 'none', value: '未知' }
    ]
    const values = ['xs', 'sm', 'md', 'lg', 'xl', 'vl'];

    return (
        <div style={{ paddingTop: 20 }}>
            <p>
                <Tag invert theme='danger'>danger 反色</Tag>
            </p>
            <p style={style}>
                <Tag onClose={() => alert('这是一个受控组件，可以关闭')}>可关闭</Tag>
            </p>
            {status.map(theme => (
                <p style={style} key={theme.key}>
                    <Divider text={theme.value} width={2} />
                    {values.map(size => (
                        <Tag key={size} size={size} theme={theme.key} value={size} style={{ marginRight: 15 }} />
                    ))}
                </p>
            ))}
        </div>
    );
}