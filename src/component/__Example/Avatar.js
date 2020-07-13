import React from 'react';
import { Avatar } from '../lib';
import AvatarDef from '../User/avatar.jpg';

const values = ['1x', '2x', 'xs', 'sm', 'md', 'lg', 'xl', 'vl'];

export function ExampleAvatar() {
    return (
        <div style={{ paddingTop: 20 }}>
            {values.map(size => (
                <Avatar key={size} size={size} src={AvatarDef} title={'size'.concat(size)} />
            ))}
        </div>
    );
}