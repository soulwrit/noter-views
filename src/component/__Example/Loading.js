import React from 'react';
import { Loading } from '@writ/react';

export function ExampleLoading() {
    return (
        <div>
            <Loading />
            <Loading type={1} />
            <Loading type={2} />
        </div>
    );
}