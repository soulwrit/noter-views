import React from 'react';
import { Flex } from '@writ/react';

export function ExampleFlex() {
    return (
        <>
            <h1>你可以用像测试其他 JavaScript 代码类似的方式测试 React 组件。</h1>
            <Flex>
                <Flex.Item>
                    <h2>创建/清理</h2>
                    <p>
                        对于每个测试，我们通常希望将 React 树渲染给附加到 document的 DOM 元素。这点很重要，以便它可以接收 DOM 事件。当测试结束时，我们需要“清理”并从 document 中卸载树。
                    </p>
                    <p>
                        常见的方法是使用一对 beforeEach 和 afterEach 块，以便它们一直运行，并隔离测试本身造成的影响
                    </p>
                </Flex.Item>
                <Flex.Item>
                    <h2> act()  </h2>
                    <p>
                        在编写 UI 测试时，可以将渲染、用户事件或数据获取等任务视为与用户界面交互的“单元”。React 提供了一个名为 act() 的 helper，它确保在进行任何断言之前，与这些“单元”相关的所有更新都已处理并应用于 DOM：
                    </p>
                    <p>
                    这有助于使测试运行更接近真实用户在使用应用程序时的体验。这些示例的其余部分使用 act() 来作出这些保证。
你可能会发现直接使用 act() 有点过于冗长。为了避免一些样板代码，你可以使用 React 测试库，这些 helper 是使用 act() 函数进行封装的。
                    </p>
                </Flex.Item>
            </Flex>
        </>
    );
}
