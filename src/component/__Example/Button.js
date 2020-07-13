import React from 'react';
import { Button, Divider } from '../lib';

export function ExampleButton() {
    const style = {
        paddingTop: 10
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
            {status.map(theme => (
                <p style={style} key={theme.key}>
                    <Divider text={theme.value} width={2}/>
                    {values.map(size => (
                        <Button key={size} size={size} theme={theme.key} value={size} />
                    ))}
                </p>
            ))}
        </div>
    );
}