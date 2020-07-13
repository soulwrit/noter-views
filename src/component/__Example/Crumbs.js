import React from 'react';
import { Crumbs, Icon } from '@writ/react';

export function ExampleCrumbs() {
    const routes = [
        {
            name: 'Login',
            path: '/'
        },
        {
            name: 'Test',
            path: '/test'
        },
    ];
    return (
        <div>
            <Crumbs routes={routes}><Icon type='back' /> </Crumbs>
        </div>
    );
}

