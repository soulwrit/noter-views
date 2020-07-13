import React, { useEffect } from 'react';
import { Card, Button, Cover, Flex } from '../lib';
import defJPG from '../User/avatar.jpg';

export function ExampleCard() {
    const flex = React.createRef();
    useEffect(() => {
        console.log('dref', flex);
    });
    return (
        <>
            <Flex dref={flex} alignItems='flex-start' justifyContent='space-between' wrap='wrap'>
                <Card width='55%' title='React uncontrolled Component' footer={<Button value='more' link />} bordered>
                    <p>In HTML, form elements such as {"<input>"}, {"<textarea>"}, and {"<select>"} typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().</p>
                    <p>We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.</p>
                    <p>For example, if we want to make the previous example log the name when it is submitted, we can write the form as a controlled component:</p>
                </Card>
                <Card width='40%' title='I am i picture.'>
                    <Cover src={defJPG} ratio={1 / 2} />
                </Card>
                <Card width='40%'>
                    <Cover src={defJPG} ratio={1 / 2} />
                </Card>
            </Flex>
        </>
    );
}