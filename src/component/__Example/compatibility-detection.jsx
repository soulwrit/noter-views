import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import bowser from 'bowser';
import styles from './style/compatibility-detection.scss'

// 谷歌浏览器下载
const chromeDownload = {
    name: 'chrome',
    path: 'https://edu-image.nosdn.127.net/969bb97a-c807-4520-8483-4e712b8ebc73.exe'
};

export default class CompatibilityDetection extends React.Component {
    constructor(props) {
        super(props);
    }

    onBack = evt => {
        if (typeof this.props.onBack === 'function') {
            this.props.onBack(evt);
        } else {
            history.length ? history.go(-1) : (location = '/');
        }
    }

    onDownload = (evt) => {
        if (typeof this.props.onDownload === 'function') {
            this.props.onDownload(evt);
        } else {
            const element = document.createElement('a');

            element.download = chromeDownload.name;
            element.href = chromeDownload.path;
            element.click();
        }
    }

    render() {
        return (
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <div className={styles.illustration} />
                    <div className={styles.body}>
                        <h2>
                            <FormattedMessage
                                id='compatibility.title'
                                defaultMessage='Browser does not support'
                                description='unsupported borwser title'
                            />
                        </h2>
                        <p>
                            <FormattedMessage
                                defaultMessage="Sorry, we don't offer support for Internet Explorer, Vivaldi, Opera or Silk, but we recommend trying a new browser such as Google Chrome, Mozilla Firefox or Microsoft Edge."
                                description='unsupported borwser description'
                                id='compatibility.unsupported'
                            />
                        </p>
                    </div>
                    <div className={styles.button}>
                        <button className={styles.back} onClick={this.onBack} >
                            <FormattedMessage
                                defaultMessage='Back'
                                description='Button to go back in unsupported browser modal'
                                id='compatibility.unsupported.back'
                            />
                        </button>

                        <button className={styles.download} onClick={this.onDownload}>
                            <FormattedMessage
                                defaultMessage='Download Chrome'
                                description='Button to go back in unsupported browser modal'
                                id='compatibility.unsupported.download'
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

CompatibilityDetection.defaultProps = {
    // onBack: PropTypes.func,
    // onDownload: PropTypes.func
}

export function detectCompatibility() {
    if (bowser.msie || bowser.vivaldi || bowser.opera || bowser.silk) {
        return false;
    }
    return true;
}