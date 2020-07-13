import React from 'react';
import { Avatar, Text } from '../lib';
import styles from './MsgMine.module.scss';
import Def_Avatar from '../User/avatar.jpg';

export default function MineMsg(props) {
    const { data } = props;
    return (
        <div className={styles.warp}>
            <div className={styles.head}>
                <Text className={styles.uname} value={data.uname} />
                <Avatar size='2x' src={Def_Avatar} />
            </div>
            <div className={styles.body}>
                <pre>{data.content}</pre>
            </div>
        </div>
    );
}