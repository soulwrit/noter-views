import React from 'react';
import { Scrollor } from '@writ/react';
import forThrough from '@writ/utils/for-through';

export const ExampleScrollor = () => {
    return (
        <Scrollor>
            {forThrough(1, 250, i => {
                return (
                    <p style={{ whiteSpace: 'nowrap' }} key={i}>{`${i} ${'-'.repeat(400)} END `}</p>
                );
            })}
        </Scrollor>
    )
}
