import React, { useState } from 'react';
import forTo from '@writ/utils/for-to';
import { Button, Tabs, Tag, Flex } from '@writ/react';
import { ExampleAutoComplete } from './__Example/AutoComplete';
import { ExampleAccordion } from './__Example/Accordion';
import { ExampleAvatar } from './__Example/Avatar';
import { ExampleBox } from './__Example/Box';
import { ExampleButton } from './__Example/Button';
import { ExampleCard } from './__Example/Card';
import { ExampleCheckbox } from './__Example/Checkbox';
import { ExampleColorPicker } from './__Example/ColorPicker';
import { ExampleContextMenu } from './__Example/ContextMenu';
import { ExampleCover } from './__Example/Cover';
import { ExampleCrumbs } from './__Example/Crumbs';
import { ExampleDrawer } from './__Example/Drawer';
import { ExampleDivider } from './__Example/Divider';
import { ExampleDropdown } from './__Example/Dropdown';
import { ExampleEditable } from './__Example/Editable';
import { ExampleElegantEditor } from './__Example/ElegantEditor';
import { ExampleFlex } from './__Example/Flex';
import { ExampleForm } from './__Example/Form';
import { ExampleGrid } from './__Example/Grid';
import { ExampleIcon } from './__Example/Icon';

import { ExampleInput } from './__Example/Input';
import { ExampleInputFile } from './__Example/InputFile';
import { ExampleInputNumber } from './__Example/InputNumber';

import { ExampleList } from './__Example/List';
import { ExampleLoading } from './__Example/Loading';
import { ExampleMask } from './__Example/Mask';
import { ExampleMenu } from './__Example/Menu';
import { ExampleModal } from './__Example/Modal';
import { ExamplePager } from './__Example/Pager';
import { ExamplePageTurn } from './__Example/PageTurn';
import { ExampleProgressBar } from './__Example/ProgressBar';
import { ExampleRadio } from './__Example/Radio';

import { ExampleScrollor } from './__Example/Scrollor';
import { ExampleSelect } from './__Example/Select';
import { ExampleSelectHigh } from './__Example/SelectHigh';
import { ExampleSuffix } from './__Example/Suffix';
import { ExampleSwitch } from './__Example/Switch';
import { ExampleTable } from './__Example/Table';
import { ExampleTabPlus } from './__Example/TabPlus';
import { ExampleTag } from './__Example/Tag';
import { ExampleText } from './__Example/Text';
import { ExampleTooltip } from './__Example/Tooltip';
import { ExampleToast } from './__Example/Toast';

const data = [
    {
        tab: 'TabPlus',
        item: ExampleTabPlus
    },
    {
        tab: 'AutoComplete',
        item: ExampleAutoComplete
    },
    {
        tab: 'InputNumber',
        item: ExampleInputNumber
    },
    {
        tab: 'Switch',
        item: ExampleSwitch
    },
    {
        tab: 'Scrollor',
        item: ExampleScrollor
    },
    {
        tab: 'Dropdown',
        item: ExampleDropdown
    },
    {
        tab: 'Tooltip',
        item: ExampleTooltip
    },
    {
        tab: 'Toast',
        item: ExampleToast
    },
    {
        tab: 'Text',
        item: ExampleText
    },
    {
        tab: 'Tag',
        item: ExampleTag
    },
   
    {
        tab: 'Table',
        item: ExampleTable
    },
    {
        tab: 'Suffix',
        item: ExampleSuffix
    },
    {
        tab: 'Select',
        item: ExampleSelect
    },
    {
        tab: 'Radio',
        item: ExampleRadio
    },
    {
        tab: 'PageTurn',
        item: ExamplePageTurn
    },
    {
        tab: 'Pager',
        item: ExamplePager
    },
    {
        tab: 'Drawer',
        item: ExampleDrawer
    },
    {
        tab: 'Modal',
        item: ExampleModal
    },
    {
        tab: 'Input',
        item: ExampleInput
    },
    {
        tab: 'Menu',
        item: ExampleMenu
    },
    {
        tab: 'Mask',
        item: ExampleMask
    },
    {
        tab: 'List',
        item: ExampleList
    },
    {
        tab: 'Icon',
        item: ExampleIcon
    },
    {
        tab: 'SelectHigh',
        item: ExampleSelectHigh
    },
    {
        tab: 'Grid',
        item: ExampleGrid
    },
    {
        tab: 'Form',
        item: ExampleForm
    },
    {
        tab: 'Flex',
        item: ExampleFlex
    },
    {
        tab: 'Editable',
        item: ExampleEditable
    },

    {
        tab: 'Divider',
        item: ExampleDivider
    },
    {
        tab: 'Crumbs',
        item: ExampleCrumbs
    },
    {
        tab: 'Cover',
        item: ExampleCover
    },
    {
        tab: 'ContextMenu',
        item: ExampleContextMenu
    },
    {
        tab: 'ColorPicker',
        item: ExampleColorPicker
    },
    {
        tab: 'Checkbox',
        item: ExampleCheckbox
    },
    {
        tab: 'Card',
        item: ExampleCard
    },
    {
        tab: 'Button',
        item: ExampleButton
    },
    {
        tab: 'Box',
        item: ExampleBox
    },
    {
        tab: 'Avatar',
        item: ExampleAvatar
    },
    {
        tab: 'Accordion',
        item: ExampleAccordion
    },
  
    {
        tab: 'InputFile',
        item: ExampleInputFile
    },
    {
        tab: 'ElegantEditor',
        item: ExampleElegantEditor
    },
    {
        tab: 'Loading',
        item: ExampleLoading
    },
    {
        tab: 'ProgressBar',
        item: ExampleProgressBar
    },

];

export default function Test() {
    const [index, setIndex] = useState(0);

    return (
        <Flex dir='ttr'>
            <Flex.Item className='sx vl' height={65}>{forTo(0, data.length, i => {
                var item = data[i];
                return (
                    <Tag
                        value={item.tab}
                        key={i} theme={i === index ? 'dark' : 'primary'}
                        onClick={() => setIndex(i)}
                        style={{ cursor: 'pointer' }}
                    />
                );
            })}</Flex.Item>
            <Flex.Item flex={1}>
                <Tabs mode='vertical' index={index} extra={<Button value='back top' />} onChange={setIndex}>
                    <Tabs.Pane>{data.map((content, index) => (
                        <Tabs.Tab key={index}>{content.tab}</Tabs.Tab>
                    ))}</Tabs.Pane>
                    <Tabs.Content>{data.map((content, index) => (
                        <Tabs.Item key={index}>{<content.item />}</Tabs.Item>
                    ))}</Tabs.Content>
                </Tabs>
            </Flex.Item>
        </Flex>
    );
}