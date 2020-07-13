import React from 'react';
import { Text, Divider, } from '../lib';

export function ExampleText() {
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
    ];

    return (
        <div>
            {status.map(theme => (
                <p style={style} key={theme.key}>
                    <Divider text={theme.value} width={2} />
                    <Text key={theme.key} theme={theme.key} size={theme.key == 'primary' ? 35 : (void 0)} value='天使（angel）这个词源于希腊语“angelos”，意为使者。在基督教，穆斯林，犹太教和其他一些神学中，天使常扮演着使者，随从，神的代理的角色。本指上天的使者，在其它不少宗教中也有类似概念，并中译为“天使”。在圣经中，神的意志通常是由天使传达的。天使是纯精神体，拥有出众的智力和巨大的力量，而且非常的神圣。天使由轻如空气的物质组成，从而使他们可以根据需要幻化成各种最适合的物质形体。'/>
                </p>
            ))}
        </div>
    );
}