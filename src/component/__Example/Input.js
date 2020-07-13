import React from 'react';
import { Input } from '@writ/react';

export const ExampleInput = () => {
    return (
        <>
            <h5>单行文本框</h5>
            <Input />
            <h5>多行文本框</h5>
            <Input.Textarea  />
        </>
    );
}
