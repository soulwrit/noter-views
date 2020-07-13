import React, { useState } from 'react';
import { Switch, Checkbox } from '@writ/react';

export const ExampleSwitch = () => {
    const [isControlled, setIsControlled] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <div>
            <p><Checkbox value='受控开关' onChange={checked => setIsControlled(checked)}></Checkbox></p>
            <p><Checkbox useLabel value='禁用开关' onChange={checked => setIsDisabled(checked)}></Checkbox></p>
            <div> 通用开关: <Switch checked={isControlled} disabled={isDisabled} on='ON' off='OFF' /></div>
            <p></p>
            <div> 汉语开关: <Switch checked={isControlled} disabled={isDisabled} on='开' off='关' /></div>
            <p> 风格开关: <Switch checked={isControlled} disabled={isDisabled} outer on='我是开' off='我是关'/></p>
        </div>
    )
}
