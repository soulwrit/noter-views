import React, { useState } from 'react';
import { TabPlus, TabPane, Select, Checkbox, Button, List, Text, Radio, prompt } from '@writ/react';

const dirs = ['ltr', 'rtl', 'ttr', 'rtt'];
const types = [
    {
        value: 'line',
        label: '线型'
    },
    {
        value: 'card',
        label: '卡牌'
    }
];
const initCentered = false;
const initEditable = true;
const initDir = 'ttr';

export const ExampleTabPlus = () => {
    const [dir, setDir] = useState(initDir);
    const [centered, setCentered] = useState(initCentered);
    const [editable, setEditable] = useState(initEditable);
    const [type, setType] = useState('line');
    const onEdited = addTab => {
        prompt('请输入页签的名称：').then(title => {
            if (title == null) return;
            prompt('请输入页签的内容').then(content => {
                addTab(
                    React.createElement(TabPane, {
                        title,
                        content: content || '',
                        closable: true
                    })
                );
            });
        });
    };

    return (
        <>
            <List>
                <List.Head>这是经过高阶加工的 选项卡</List.Head>
                <List.Item>
                    布局与位置：<Select defaultValue={initDir} onChange={dirs => setDir(dirs[0].value)}>
                        {dirs.map(value => {
                            return <Select.Option value={value} key={value}>{value}</Select.Option>
                        })}
                    </Select>
                </List.Item>
                <List.Item>
                    页签是否居中：<Checkbox onChange={() => setCentered(!centered)} />
                </List.Item>
                <List.Item>
                    是否可新增页签：<Checkbox checked={initEditable} onChange={() => setEditable(!editable)} />
                </List.Item>
                <List.Item>
                    页签的基本样式：<Radio.Group checked={0} name='type' onChange={i => setType(types[i].value)}>{types.map(item => (<Radio value={item.label} key={item.value} />))}</Radio.Group>
                </List.Item>
            </List>

            <TabPlus
                centered={centered}
                dir={dir}
                editable={editable}
                extra={
                    <Button link>扩展动作</Button>
                }
                onEdited={onEdited}
                style={{
                    height: 350,
                    padding: '2em'
                }}
                type={type}
            >
                <TabPane title='天使'>
                    <p>天使（angel）这个词源于希腊语“angelos”，意为使者。在基督教，穆斯林，犹太教和其他一些神学中，天使常扮演着使者，随从，神的代理的角色。本指上天的使者，在其它不少宗教中也有类似概念，并中译为“天使”。在圣经中，神的意志通常是由天使传达的。天使是纯精神体，拥有出众的智力和巨大的力量，而且非常的神圣。天使由轻如空气的物质组成，从而使他们可以根据需要幻化成各种最适合的物质形体。</p>
                    <p>天使作为神特殊的孩子享受着和神之间的亲密关系，在天堂凝望着、爱着、赞美着神。有些天使经常从天上给人类带来神的旨意。天使的数量是数之不尽的，他们存在在宇宙中的各个角落。天使专注于为所有的具有自由意识的实体的需求服务，因此你可以体验到天使的那种无差别的爱。天使毫不犹豫地执行着他们所分配的任务，带着极大的快乐提供给人们爱、智慧和指导。每一个人身边都一直有天使围绕，毫无例外，天使热切的寻找着机会和你交流。</p>
                    <p>天使是因为一个目的而被创造出来的，那就是爱和无差别的为所有人服务。在基督教和神学中，一个天使可能是天上九个阶层中最低等级的一位，必须听命于天使长。堕天使经常被认为是恶魔，就好像撒旦；而守护天使则被认为是人类的指引者和守护者。天使通常被描述为具有翅膀和身穿长袍的样子，或者头戴光环（一种在天使头上撒发出神圣光芒的光圈——是神性智慧的象征）。天使不会死也不会老，他们是不朽的，由神创造，自创世纪就一直存在着。通常天使被认为是灵魂的指引者。尽管天使是神圣的，他们也经常会犯原始的错误，特别是骄傲自负。</p>
                </TabPane>
                <TabPane title='恶魔'>
                    <p> 综观东方或西方的历史，人类文化早期的泛灵论（Animism）时代，并没有恶魔的存在，那时候顶多只有邪恶精灵的出现，或是所谓的恶作剧精灵（Trickster）。当历史开始进入多神教时代，人们认为善与恶始终是对立的，有代表正义的善神，即代表邪恶势力的恶神。此种善恶二元论思想被认为源于波斯及巴比伦等地的宗教中，为人类揭示了光明与黑暗两股势力的源头。</p>
                    <p>如萨满宗教中为人带来疾病等灾厄的“邪恶精灵”“恶灵”、神祇或人类之敌、诱惑人类的存在，皆可以“demon”称之</p>
                </TabPane>
                <TabPane title='擎天柱' closable>
                    <p> 擎天柱（Optimus Prime）的优秀能力之一是充分掌握敌人的情况， 透彻地研究情报，以最短的时间击退敌人。擎天柱的领导才能和善良的心，使地球人对他十分信任，他的工作也就可以更顺利地完成。 </p>
                    <p> 在塞伯坦内战之前，擎天柱只是一名普通人，他向往和平，甚至向往可以飞行的霸天虎。然而，他相信只有反抗才能生存。 </p>
                    <p>G1动画里，钛师傅将他改造成一个完善的战斗机器人后，他投入了反抗霸天虎的志向中，为自由而战。不同作品有关擎天柱领袖身份的来历有不同解释。</p>
                </TabPane>
                <TabPane title='九儿'>
                    <Text type='p'> 身边的那片田野啊 </Text>
                    <Text type='p'> 身边的那片田野啊 </Text>
                    <Text type='p'> 手边的枣花香 </Text>
                    <Text type='p'> 高粱熟来红满天 </Text>
                    <Text type='p'> 九儿我送你去远方 </Text>
                    <Text type='p'> 身边的那片田野啊 </Text>
                    <Text type='p'> 手边的枣花香 </Text>
                    <Text type='p'> 高粱熟来红满天 </Text>
                    <Text type='p'> 九儿我送你去远方 </Text>
                    <Text type='p'> 啊 啊 </Text>
                    <Text type='p'> 高粱熟来红满天 </Text>
                    <Text type='p'> 九儿我送你去远方 </Text>
                    <Text type='p'> 九儿我送你去远方 </Text>
                </TabPane>
            </TabPlus>
        </>
    )
}
