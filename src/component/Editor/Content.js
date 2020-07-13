import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Icon } from '../lib';

import styles from './Content/index.module.scss';
import MonacoEditor from './Content/lib/Monaco';
import fs from '../../utils/fs';

import { models, delEditFiles, setActivate, onSaveVisible } from '../../reducers/files';
import Save from './Content/Save';
import Welcome from './Content/Welcome';
import FastKey from './Content/FastKey';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: undefined
        };
    }
    componentDidMount() {
        this.getDetail();
    }
    onKeyUp = e => {
        console.log(e.ctrlKey, e.shiftKey, e.altKey, e.key, e.keyCode);
        FastKey.alt_s(e, this.props.onSaveVisible);
    }
    getDetail() {
        if (this.props.activate) {
            models.detail({ id: this.props.activate.id }).then(res => {
                this.props.setActivate(res.data);
                this.forceUpdate();
            });
        }
    }
    onToggle = index => {
        this.props.setActivate(index);
    }
    onClose = index => {
        this.props.delEditFiles(index);
        this.props.setActivate((index - 1) < 0 ? 0 : (index - 1));
    }
    onChange = value => {
        if (!this.props.activate) return;
        this.props.activate.content = value;
    }
    render() {
        const { activate, values } = this.props;

        return (
            <div className={styles.box} onKeyUp={this.onKeyUp}>
                <div className={styles.tab}>
                    {values.map((file, index) =>
                        <div key={index}
                            className={classnames(styles.item, activate === file ? styles.active : '')}
                            onClick={() => this.onToggle(index)}
                        >
                            <span>{file.name}</span>
                            <Icon className={styles.close} type='close' title='关闭' onClick={() => this.onClose(index)} />
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    {activate &&
                        <MonacoEditor
                            onChange={this.onChange}
                            language={fs.type(activate.type)}
                            value={activate.content}
                        />}
                    {!activate && <Welcome />}
                    {activate && <Save value={activate} />}
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ files, users }, props) => {
    return {
        values: files.edited,
        activate: files.activate || props.activate,
        created_by: props.created_by || users.id
    };
}
const mapDispatchToProps = {
    delEditFiles,
    setActivate,
    onSaveVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)