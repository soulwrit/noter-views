import React from 'react';
import { Avatar, Text } from '../lib';
import styles from './MsgUser.module.scss';
import Def_Avatar from '../User/avatar.jpg';

export default function UserMsg(props) {
    const { data } = props;

    return (
        <div className={styles.warp}>
            <div className={styles.head}>
                <Avatar size='2x' src={Def_Avatar} />
                <Text value={data.uname} className={styles.uname} />
            </div>
            <div className={styles.body}>
                <pre>{data.content}</pre>
            </div>
        </div>
    );
}