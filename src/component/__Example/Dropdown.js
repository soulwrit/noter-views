import React from 'react';
import { Dropdown, } from '@writ/react';

export function ExampleDropdown() {
    return (
        <div>
            <Dropdown>
                <Dropdown.Head>123</Dropdown.Head>
                <Dropdown.Item>1</Dropdown.Item>
                <Dropdown.Item>2</Dropdown.Item>
                <Dropdown.Item>3</Dropdown.Item>
                <Dropdown.Item>
                    <Dropdown>
                        <Dropdown.Head>4</Dropdown.Head>
                        <Dropdown.Item>4.1</Dropdown.Item>
                        <Dropdown.Item>
                            <Dropdown>
                                <Dropdown.Head>4.2</Dropdown.Head>
                                <Dropdown.Item>4.2.1</Dropdown.Item>
                                <Dropdown.Item>4.2.2</Dropdown.Item>
                            </Dropdown>
                        </Dropdown.Item>
                    </Dropdown>
                </Dropdown.Item>
                <Dropdown.Group>
                    <Dropdown.Item>5</Dropdown.Item>
                    <Dropdown.Item>6</Dropdown.Item>
                    <Dropdown.Item>7</Dropdown.Item>
                    <Dropdown.Item>8</Dropdown.Item>
                </Dropdown.Group>
            </Dropdown>
        </div>
    );
}