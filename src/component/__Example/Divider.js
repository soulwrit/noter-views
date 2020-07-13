import React from 'react';
import { Divider, Text } from '@writ/react';

export function ExampleDivider() {
    return (
        <div>
            Why JSX? <Divider /> <Text>React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.</Text>
        </div>
    );
}