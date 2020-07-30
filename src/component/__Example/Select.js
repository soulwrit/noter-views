import React, { useState } from 'react';
import { Select, Button, Text, List } from '@writ/react';

const foods = [
    {
        value: 'id-1',
        label: '鸡蛋面'
    },
    {
        value: 'id-2',
        label: '臊子面'
    },
    {
        value: 'id-3',
        label: '杂酱面'
    },
    {
        value: 'id-4',
        label: '擀面皮'
    },
    {
        value: 'id-5',
        label: '重庆小面'
    },
    {
        value: 'id-6',
        label: '巴蜀麻辣烫'
    },
];
const dacai = [
    {
        title: '鱼类',
        value: [
            {
                value: 7,
                label: '鲨鱼'
            },
            {
                value: 8,
                label: '鳄鱼'
            },
            {
                value: 9,
                label: '鲸鱼'
            },
            {
                value: 10,
                label: '海豹'
            },
            {
                value: 11,
                label: '乌贼'
            },
            {
                value: 12,
                label: '大海龟'
            },
        ]
    },
    {
        title: '蔬菜',
        value: [
            {
                value: 13,
                label: '大白菜'
            },
            {
                value: 14,
                label: '小白菜'
            },
            {
                value: 15,
                label: '鸡毛菜'
            },
            {
                value: 16,
                label: '生菜'
            },
            {
                value: 16,
                label: '油麦菜'
            },
        ],
    },
    {
        title: '水果',
        value: [
            {
                value: 17,
                label: '苹果'
            },
            {
                value: 18,
                label: '橘子'
            },
            {
                value: 19,
                label: '香蕉'
            },
            {
                value: 20,
                label: '牛油果'
            },
            {
                value: 21,
                label: '火龙果'
            },
        ],
    }
];

export const ExampleSelect = () => {
    const initFood = foods[1];
    const [food, setFood] = useState([initFood]);
    const [water, setWater] = useState();
    const [multiple, setMultiple] = useState(false);
    const [status, setStatus] = useState();
    const [disabled, setDisabled] = useState(false);

    return (
        <>
            <List>
                <List.Head>下拉选择器的相关信息</List.Head>
                <List.Item>
                    吃货的选择： {Array.isArray(food) ? food.map((item, key) => {
                        return <Text key={key}>{item.label} ID({item.value}) </Text>;
                    }) : food}
                    吃货还选择：{Array.isArray(water) ? water.map((item, key) => {
                        return <Text key={key}>{item.label} ID({item.value}) </Text>;
                    }) : null}
                </List.Item>
                <List.Item>我的状态：<Text>{status ? '已打开！' : '已关闭！'}</Text></List.Item>
                <List.Item>点我禁用：<Button onClick={() => setDisabled(!disabled)}>{disabled ? '启用' : '禁用'}</Button></List.Item>
                <List.Item>开启多选：<Button onClick={() => {
                    setMultiple(!multiple);
                    setFood([initFood]);
                }}>{multiple ? '单选' : '多选'}</Button></List.Item>
                <List.Foot>
                    主食：
                    <Select
                        disabled={disabled}
                        multiple={multiple}
                        onChange={setFood}
                        onClose={() => setStatus(!status)}
                        onOpen={() => setStatus(!status)}
                        defaultValue={initFood}
                    >
                        {foods.map((food, key) => (
                            <Select.Option key={key} disabled={key === 3} value={food.value} label={food.label} />
                        ))}
                    </Select>

                    大菜：<Select
                        multiple
                        onChange={value => setWater(value)}
                        render={option => {
                            return option.label + ','
                        }}
                    >
                        {dacai.map((group, key) => (
                            <Select.Optgroup title={group.title} key={key}>
                                {group.value.map((value, key) => (
                                    <Select.Option key={key} value={value.value} label={value.label} />
                                ))}
                            </Select.Optgroup>
                        ))}
                    </Select>
                </List.Foot>
            </List>
        </>
    );
}
