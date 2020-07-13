import React from 'react';
import PropTypes from 'prop-types';
import { Text, Icon } from '../lib';
import styles from './LoginError.module.scss';

export default function LoginError(props) {
    const { error, info } = props;
    return (
        <div className={styles.loginError}>
            <Text type='p' theme='danger'>{error.message}</Text>
            <Text type='p' theme='info'><Icon type='info' size='3x' className={styles.loginErrorInfo} />{info}</Text>
        </div>
    );
}
LoginError.defaultProps = {
    error: new Error('Unknown Error'),
    info: '未知错误！'
}
if (window.DEV){
    LoginError.propTypes = {
        error: PropTypes.instanceOf(Error).isRequired,
        info: PropTypes.any
    };
}