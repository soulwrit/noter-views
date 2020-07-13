import React from 'react';
import { SelectHigh } from '@writ/react';
import forTo from '@writ/utils/for-to';

const values = forTo(0, 100, () => ({ value: Math.floor(Math.random() * 1000000 + 1000) }));
export function ExampleSelectHigh() {
    return (
        <>
            <SelectHigh
                values={values}
            />
        </>
    );
}
