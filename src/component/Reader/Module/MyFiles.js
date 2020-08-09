import React, { } from 'react';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import { Slot, Pager, Icon, Crumbs } from '@writ/react';

import fs from '../../Editor/fs';
import styles from '../index.module.scss';
import { FileItem } from '../Component/FileItem/FileItem';
import { FileInfo } from '../Component/FileInfo/FileInfo';
import { openReaderLayoutMessageBox } from '../reducers/layout';

class MyFiles extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            files: [
                {
                    id: 36,
                    intro: "22",
                    name: "12",
                    pid: 34,
                    type: 1,
                    updated_at: "2020-07-23T15:35:39.000Z"
                },
                {
                    id: 32,
                    intro: "用于展示 ICON。该组件的 ICON 图形基于 Webfont，因此可任意放大、改变颜色。",
                    name: "Icon 图标",
                    pid: 28,
                    type: 2,
                    updated_at: "2020-07-22T20:41:44.000Z",
                }
            ],
            filesTotal: 1,
            activeFile: null
        };
        this.pagerParams = {
            pageNo: 1,
            pageSize: 2,
            created_by: props.created_by
        };
    }
    // 文件列表
    onPagerChange = (pageNo, pageSize) => {
        this.pagerParams.pageNo = pageNo;
        this.pagerParams.pageSize = pageSize;
        this.getList();
    }
    // 查看文件信息
    // View file information
    onViewFileInfo(e, file) {
        e.stopPropagation();
        this.setState({ activeFile: file }, () => {
            this.props.openReaderLayoutMessageBox();
        });
    }
    // 查看文件详情
    // View folder information
    onViewFileDetail(e, file) {
        e.stopPropagation();
        if (fs.isFile(file)) {
            // 查看文件详情
            return;
        }
        // 打开文件夹
        console.log();
    }
    render() {
        const { files, filesTotal, activeFile } = this.state;
        const pagerParams = this.pagerParams;

        return (
            <>
                <Slot name='address'>
                    <Crumbs>我的笔记列表</Crumbs>
                </Slot>
                <Slot name='content'>
                    <div className={styles.myFiles}>
                        {files.length > 0 ? files.map(file => {
                            const isActived = activeFile && activeFile.id === file.id;

                            return (
                                <FileItem
                                    file={file}
                                    isActived={isActived}
                                    key={file.id}
                                    onClick={e => this.onViewFileInfo(e, file)}
                                    onDoubleClick={e => this.onViewFileDetail(e, file)}
                                />
                            );
                        }) : <div className={styles.fileHold}>这个人很懒，居然没有写过笔记！</div>}
                    </div>

                    <Pager
                        total={Math.ceil(filesTotal / pagerParams.pageSize)}
                        pageNo={pagerParams.pageNo}
                        pageSize={pagerParams.pageSize}
                        onChange={this.onPagerChange}
                        prev={<Icon type="back" />}
                        next={<Icon type="more" />}
                        className='tac'
                    />
                </Slot>
                <Slot name='message'>
                    {activeFile == null ? null : <FileInfo file={activeFile} />}
                </Slot>
                <Slot name='asidebar'>
                    最新评论
                </Slot>
            </>
        );
    }
}
MyFiles.defaultProps = {

};
if (window.DEV) {
    MyFiles.propTypes = {

    };
}
const mapStateToProps = () => {
    return {};
};
const mapDispatchToProps = {
    openReaderLayoutMessageBox
};
export default connect(mapStateToProps, mapDispatchToProps)(MyFiles);