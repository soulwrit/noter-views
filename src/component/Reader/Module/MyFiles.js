import React, { } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Slot, Pager, Icon, Crumbs } from '@writ/react';

import styles from '../index.module.scss';
import { getFileIconByClosed } from '../../FileIcon/Icon';

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
    //  笔记列表
    onPagerChange = (pageNo, pageSize) => {
        this.pagerParams.pageNo = pageNo;
        this.pagerParams.pageSize = pageSize;
        this.getList();
    }
    // 文件点击
    onFileClick = (e, file) => {
        e.stopPropagation();
        this.setState({
            activeFile: file
        });
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
                                <div
                                    className={classnames(styles.fileItem, {
                                        [styles.fileItemActive]: isActived
                                    })}
                                    key={file.id}
                                    onClick={e => this.onFileClick(e, file)}
                                >
                                    <div className={styles.fileIcon}>
                                        {getFileIconByClosed(file, isActived)}
                                    </div>
                                    <div className={styles.fileName}> {file.name} </div>
                                </div>
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
                        className={styles.centerPager}
                    />
                </Slot>
                <Slot name='message'>
                    {activeFile == null ? null : (
                        <div className={styles.fileInfo}>
                            <div className={styles.fileInfoIcon}>
                                {getFileIconByClosed(activeFile, true)}
                            </div>
                            <div className={styles.fileName}>
                                {activeFile.name}
                                <span className={styles.fileUpdateAt}>最新更新日期：{activeFile.updated_at}</span>
                            </div>
                            <div className={styles.fileIntro}>{activeFile.intro}</div>
                        </div>
                    )}
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

};
export default connect(mapStateToProps, mapDispatchToProps)(MyFiles);