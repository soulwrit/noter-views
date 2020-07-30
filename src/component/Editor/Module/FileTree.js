import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, TreeNode, TreeView, TreeMeta, Slot, toast } from '@writ/react';
import hasOwn from '@writ/utils/object-has-own';

import styles from '../index.module.scss';
import fs from '../fs';

import { IconFileNew, IconFolderNew, getFileIcon } from '../Component/Icon';
import { CTXMenu } from '../Component/CTXMenu';

import { registFastKey, unregistFastKey } from '../Plugin/fastKey';
import { disableContextMenu, releaseContextMenu } from '../Plugin/disableDefaultContextMenu';
import { getFiles } from '../reducers/file';
import { openFileDeleter } from '../reducers/fileDeleter';
import { openFileEditor } from '../reducers/fileEditor';
import { appendToOpenedList } from '../reducers/fileOpened';
import { openFileSaver } from '../reducers/fileSaver';

class FileTree extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ctxMenu = [
            { children: '新建文件', key: 'createFile' },
            { children: '新建文件夹', key: 'createFolder' },
            { children: '复制', key: 'copy' },
            { children: '粘贴', key: 'paste' },
            { children: '删除', key: 'remove' },
            { children: '预览', key: 'preview' },
            { children: '复制路径', key: 'copyPath' },
        ];
        this.ctxMenuLoaders = {
            createFile: pid => {
                this.props.openFileEditor(2, null, pid);
            },
            createFolder: pid => {
                this.props.openFileEditor(1, null, pid);
            },
            remove: (id, type) => {
                if (fs.isDirectory(type)) return false;
                const { openFileDeleter, values } = this.props;
                let target;

                for (const file of values) {
                    if (file.id == id) {
                        target = file;
                        break;
                    }
                }
                if (target) {
                    return openFileDeleter(target);
                }
                toast.error('不存在删除对象，可能是缓存导致，也有可能是程序bug，请报告给开发者');
            }
        };
        this.menu = new TreeNode(0);
        this.state = {
            activeNodeId: props.openedActive ? props.openedActive.id : void 0,
            ctxMenu: this.ctxMenu,
        };
    }
    componentDidMount() {
        // 读取文件
        this.getFiles();
        // 注册 alt 快捷键
        registFastKey({
            createFile: () => this.props.openFileEditor(2),
            saveFile: () => this.props.openFileSaver(this.props.openedActive)
        });
        // 禁用右键菜单
        disableContextMenu();
    }
    componentWillUnmount() {
        // 注销 alt 快捷键
        unregistFastKey();
        // 释放右键菜单
        releaseContextMenu();
    }
    getFiles() {
        this.props.getFiles({ created_by: this.props.created_by });
    }
    onRefresh = () => {
        this.getFiles();
    }
    onExpand = () => {
        this.checkStatus(false);
    }
    onTree = (node, tree) => {
        const data = node.data;
        this.setState({ activeNodeId: data.id });
        if (fs.isDirectory(data.type)) {
            tree.expand();
            return;
        };
        this.props.appendToOpenedList(data);
    }
    onCTXMenu = (key, fd) => {
        if (key == null) return toast.warn('无关联的右键功能！');
        let id, type;
        if (typeof fd === 'string') {
            const fds = fd.split('-');

            id = fds[0];
            type = fds[1];
        }
        
        if (hasOwn(this.ctxMenuLoaders, key)) {
            const loader = this.ctxMenuLoaders[key];
            if (typeof loader === 'function') return loader(id, type);
        }

        toast.warn('关联的右键功能没有实现，请等待下个版本!');
    }
    onCTXMenuFilter = (fd, current) => {
        if (fd == null) return;
        const type = fd.split('-')[1];
        if (fs.isFile(type * 1)) {
            const fileIgnores = ['createFile', 'createFolder'];
            return this.setState({
                ctxMenu: current.filter(opt => fileIgnores.indexOf(opt.key) === -1)
            });
        }

        this.setState({
            ctxMenu: this.ctxMenu
        });
    }
    checkStatus(isExpanded) {
        const files = this.props.openedFiles;
        const flats = this.menu.flat;
        const { openedActive } = this.props;

        for (const file of files) {
            const id = file.id;
            const node = flats[id];

            node.scanUp((parent) => {
                parent.expanded = isExpanded;
            });
            if (id === openedActive.id) {
                node.selected = true;
            }
        }
    }
    render() {
        const { getFileIcon, indent, openFileEditor, values } = this.props;
        const { activeNodeId, ctxMenu } = this.state;

        this.menu.generate(values);
        this.checkStatus(true);

        return (
            <>
                <Slot name='menuTitle'>资源目录</Slot>
                <Slot name='menuAction'>
                    <Icon size='2x' type={<IconFileNew />} title='新建文件' onClick={() => openFileEditor(2)} />
                    <Icon size='2x' type={<IconFolderNew />} title='新建文件夹' onClick={() => openFileEditor(1)} />
                    <Icon size='2x' type='refresh' title='刷新资源列表' onClick={this.onRefresh} />
                    <Icon size='2x' type='box' title='折起打开的文件夹' onClick={this.onExpand} />
                </Slot>
                <Slot name='menuContent'>
                    <CTXMenu title='资源操作清单' values={ctxMenu} onHandle={this.onCTXMenu} filter={this.onCTXMenuFilter}>
                        {this.menu.walk((node, children) => {
                            const { id, data, depth } = node;

                            return React.createElement(TreeView, {
                                children,
                                key: id,
                                expanded: node.expanded,
                                disabled: node.disabled,
                                render: (state, tree) => (
                                    <TreeMeta
                                        active={styles.treeNodeActive}
                                        className={styles.treeNode}
                                        data-tid={`${id}-${data.type}`}
                                        onClick={() => this.onTree(node, tree)}
                                        selected={activeNodeId ? activeNodeId === id : node.selected}
                                        style={{
                                            paddingLeft: indent * depth
                                        }}
                                    >
                                        <Icon type={getFileIcon(data, state)} size='2x' />
                                        <span className={styles.treeNodeName}>{data.name}</span>
                                    </TreeMeta>
                                )
                            });
                        }, [])}
                    </CTXMenu>
                </Slot>
            </>
        );
    }
}

FileTree.defaultProps = {
    getFileIcon,
    indent: 8,
};
if (window.DEV) {
    FileTree.propTypes = {
        getFileIcon: PropTypes.func,
        indent: PropTypes.number,
    };
}
const mapStateToProps = ({ files, users }) => {
    return {
        created_by: users.id,
        openedActive: files.opened.active,
        openedFiles: files.opened.values,
        values: files.values,
    };
};
const mapDispatchToProps = {
    appendToOpenedList,
    getFiles,
    openFileDeleter,
    openFileEditor,
    openFileSaver,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileTree);