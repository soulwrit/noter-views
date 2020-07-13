import React from 'react';
import { Accordion } from '../lib';

const values = (array => {
    for (let i = 0; i < 20; i++) {
        array[i] = {
            head: Math.floor(Math.random() * 1000000 + 1000),
            body: Math.floor(Math.random() * 10000000000000 + 1000)
        };
    }
    return array;
})([]);

export function ExampleAccordion() {
    return (
        <>
            <Accordion multiple={false}>
                {values.map((item, index) => (
                    <Accordion.Item key={index} value={item.head}>
                        <p>{item.body}</p>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    );
}