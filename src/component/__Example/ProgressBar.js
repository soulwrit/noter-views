import React, { useEffect } from 'react';
import { ProgressBar, getCommonProgressBar } from '../lib';

const progress = getCommonProgressBar({
    autoStart: true
});
export function ExampleProgressBar() {

    useEffect(() => {
        progress.start(0, 0.05);
    }, [])
    return (
        <>
            <ProgressBar value={60} />
        </>
    );
}