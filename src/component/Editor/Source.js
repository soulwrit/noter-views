import React from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { Icon, TreeNode, TreeView, ContextMenu, Divider } from '../lib';
import styles from './index.module.scss';

import fs from '../../utils/fs';
import { onVisible, onDelVisible, getFiles, addEditFiles, setActivate } from '../../reducers/files';
import SourceEditor from './Source/Editor';
import SourceDelete from './Source/Delete';

class Source extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            activate: null
        };
        this.menu = new TreeNode(0);
    }

    getFiles() {
        this.props.getFiles({
            created_by: this.props.created_by
        }, res => {
            this.menu.make(res);
        });
    }

    componentDidMount() {
        this.getFiles();
    }

    onRefresh = () => {
        this.getFiles();
    }

    onExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    onMenuClick = node => {
        const data = node.data;
        this.setState({ activate: data });
        if (fs.isDirectory(data.type)) return;
        this.props.setActivate(data);
        this.props.addEditFiles(data);
    }

    onContextMenu = (e, type) => {
        switch (type) {
            case 'delete':
                this.props.onDelVisible();
                break;

            default:
                break;
        }
    }

    getContextMenu = (/* ctx */) => {
        return (
            <>
                <div data-evt='copy'>复制</div>
                <div data-evt='paste'>粘贴</div>
                <div data-evt='copy-path'>复制路径</div>
                <Divider />
                <div data-evt='modify'>修改</div>
                <div data-evt='delete'>删除</div>
                <Divider />
                <div data-evt='preview'>预览</div>
                <div data-evt='info'>信息</div>
            </>
        )
    }

    render() {
        const { props } = this;
        const activate = this.state.activate || props.activate;

        return (
            <>
                <div className={styles.menuHead}>
                    <div className={styles.menuTitle}>资源目录</div>
                    <div className={styles.menuAction}>
                        <Icon type='add' title='新建文件' onClick={() => props.onVisible(2)} />
                        <Icon type='form' title='新建文件夹' onClick={() => props.onVisible(1)} />
                        <Icon type='refresh' title='刷新资源列表' onClick={this.onRefresh} />
                        <Icon type='box' title='折起打开的文件夹' onClick={this.onExpand} />
                    </div>
                </div>
                <ContextMenu menu={this.getContextMenu} onClick={this.onContextMenu}>
                    <div className={styles.menuBody}>
                        {this.menu.reduce((node, children) => {
                            const { id, data } = node;

                            return React.createElement(TreeView, {
                                key: id,
                                children,
                                expanded: this.expanded,
                                isExpand: fs.isDirectory(data.type),
                                selected: activate ? activate.id === id : false,
                                onClick: () => this.onMenuClick(node),
                                head: status => (
                                    <>
                                        <Icon type={fs.getIcon(data, status)} size='2x' />
                                        <span className={styles.treeName}>{data.name}</span>
                                    </>
                                )
                            });
                        }, [])}
                    </div>
                </ContextMenu>
                <SourceEditor created_by={props.created_by} pid={fs.getPid(activate)} />
                {activate && <SourceDelete created_by={props.created_by} value={activate} />}
            </>
        );
    }
}

const mapStateToProps = ({ files, users }) => {
    return {
        values: files.values,
        activate: files.activate,
        created_by: users.id
    };
};
const mapDispatchToProps = {
    getFiles,
    addEditFiles,
    onVisible,
    onDelVisible,
    setActivate
};

export default connect(mapStateToProps, mapDispatchToProps)(Source);