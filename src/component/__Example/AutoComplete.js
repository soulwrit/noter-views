import React from 'react';
import { AutoComplete } from '@writ/react';
import forTo from '@writ/utils/for-to';

const values = forTo(0, 100, () => ({ value: Math.floor(Math.random() * 1000000 + 1000) }));

export function ExampleAutoComplete() {
    return React.createElement(AutoComplete, {
        values
    });
}