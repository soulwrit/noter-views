import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../lib';
import date from '../../utils/date';
import styles from './Timeline.module.scss';

export default function Timeline(props) {
    const now = date.to(props.time).getTime();
    const fmt = date.isToday(now) ? 'hh:mm' : 'yyyy年MM月dd日 hh:mm:ss';

    return <Text type='p' className={styles.timeline}>{date.format(now, fmt)}</Text>
}
if (window.DEV) {
    Timeline.propTypes = {
        time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]).isRequired
    };
}