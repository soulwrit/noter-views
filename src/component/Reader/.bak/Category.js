import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table, Pager, Modal, toast } from '../../lib';

import { getNotes, getNotesDetail, delNotes } from '../Model/Note';
import { getCategories } from '../redux/notes';
import CategoryDelete from './CategoryDelete';
import CategoryEditor from './CategoryEditor';

import markdown from './lib/md-parse';
import styles from './index.module.scss';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paths: [
                {
                    id: -1,
                    name: '笔记列表',
                    __kind__: 'C'
                }
            ],
            viewKey: 'C',
            list: [], // 笔记列表
            listTotal: 0,
            deleteVisible: false,
            deleting: null,
            detail: null,
        };
        this.columns = [
            { key: 'name', value: '名称' },
            { key: 'intro', value: '摘要' },
            { key: 'updated_at', value: '最后更新' },
            { key: 'actions', value: '操作' },
        ];
        this.listParams = {
            pageNo: 1,
            pageSize: 2,
            category: null,
            created_by: props.created_by
        };
    }

    componentDidMount() {
        this.props.getCategories();
    }

    // 读取文件：列表
    getList(id) {
        if (typeof id === 'number') {
            this.listParams.category = id;
        }
        getNotes(this.listParams).then(res => {
            if (res.code) {
                throw new Error(res.msg);
            }

            this.setState({
                list: res.data.rows,
                listTotal: res.data.total
            });
        }).catch(err => {
            toast.error(err.message);
        });
    }

    // 读取文件：详情
    getDetail(id) {
        if (!id) return;

        getNotesDetail({ id }).then(res => {
            if (res.code) {
                throw new Error(res.msg);
            }

            this.setState({
                detail: res.data
            });
        }).catch(error => {
            toast.error(error.message);
        });
    }

    // 文件删除：确认
    onDeleteNoteConfirm = e => {
        try {
            const { id, name } = this.state.deleting;

            delNotes({ id, created_by: this.props.created_by }).then(res => {
                if (res.code) throw new Error(res.msg);

                toast.success('笔记：' + name + ' 删除成功!');
                this.onDeleteNoteTrigger(e);
                this.getList(this.listParams.category);
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    }

    // 文件删除：触发
    onDeleteNoteTrigger = (e, note) => {
        e.stopPropagation();
        this.setState({
            deleteVisible: !this.state.deleteVisible
        });

        if (note) {
            this.setState({
                deleting: note,
            });
        }
    }

    // 文件夹：跳转
    onJump = (path, kind) => {
        let _paths = this.state.paths;
        let paths, curr, viewKey;

        if (typeof path === 'number') {
            _paths.splice(path);
            paths = _paths;
            curr = paths[paths.length - 1];
        } else {
            if (_paths.includes(path)) {
                return;
            }
            path.__kind__ = kind;
            curr = path;
            paths = [..._paths, path];
        }

        viewKey = curr.__kind__;
        switch (viewKey) {
            case 'L':
                this.getList(curr.id);
                break;
            case 'D':
                this.getDetail(curr.id);
                break;
            default:
                this.props.getCategories();
                break;
        }

        this.setState({
            paths: paths || [],
            viewKey
        });
    }

    //  笔记列表
    onPagerChange = (pageNo, pageSize) => {
        this.listParams.pageNo = pageNo;
        this.listParams.pageSize = pageSize;
        this.getList();
    }

    // 文件详情：删除
    onEditDetail = data => {

    }

    contentRender() {
        const { props, state, listParams } = this;

        switch (state.viewKey) {
            case 'C':
                return (
                    props.categories.length
                        ? props.categories.map((item, index) => (
                            <div className={styles.categoryItem} key={index}>
                                <div className={styles.categoryIcon}>
                                    <Icon type='form' size='4x' />
                                </div>
                                <div className={styles.categoryDesc}>
                                    <p className={styles.categoryName}>
                                        <a href='javascript:;' onClick={() => this.onJump(item, 'L')}>{item.name}</a>
                                    </p>
                                    <p className={styles.categoryIntro}>{item.intro}</p>
                                </div>
                                <div className={styles.categoryExtra}>
                                    <CategoryDelete value={item} />
                                    <CategoryEditor value={item} />
                                </div>
                            </div>
                        ))
                        : <div className={styles.categoryHold}>您还没有写过笔记！</div>
                );

            case 'L':
                return (
                    <>
                        <Table
                            className='hover tighten'
                            source={state.list}
                            columns={this.columns}
                            extra={
                                <Pager
                                    total={Math.ceil(state.listTotal / listParams.pageSize)}
                                    pageNo={listParams.pageNo}
                                    pageSize={listParams.pageSize}
                                    onChange={this.onPagerChange}
                                    prev={<Icon type="back" />}
                                    next={<Icon type="more" />}
                                />
                            }>
                            <Table.Column render={(key, value) =>
                                <a href='javascript:;' onClick={() => this.onJump(value, 'D')}>{value[key]}</a>
                            } />
                            <Table.Column style={{ maxWidth: 150 }} />
                            <Table.Column render={(key, value) => new Date(value[key]).toLocaleString()} />
                            <Table.Column render={(key, value, data) => (
                                <>
                                    <Icon type='edit' title="编辑"
                                        onClick={() => this.onEditDetail(value, key, data)} />
                                    <Icon type='delete' title="删除"
                                        style={{ marginLeft: 15 }}
                                        onClick={e => this.onDeleteNoteTrigger(e, value)} />
                                </>
                            )} />
                        </Table>
                        {
                            state.deleting &&
                            <Modal
                                title='文件删除'
                                width={320}
                                visible={state.deleteVisible}
                                onClose={this.onDeleteNoteTrigger}
                                footer={
                                    <>
                                        <Button size='sm' value='确认' onClick={this.onDeleteNoteConfirm} />
                                        <Button size='sm' theme='muted' value='取消' onClick={this.onDeleteNoteTrigger} />
                                    </>
                                }>
                                <p>您确定要删除 {state.deleting.name} 吗?</p>
                            </Modal>
                        }
                    </>
                );
            case 'D':
                return state.detail ? (
                    <>
                        <div className={styles.detailInfo} title={state.detail.category_intro}>
                            更新时间：<span className={styles.detailMuted}>{state.detail.updated_at}</span>
                            <p></p>
                            内容摘要：<span className={styles.detailMuted}>{state.detail.intro}</span>
                        </div>
                        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: markdown(state.detail.content || '') }} />
                    </>
                ) : '加载中 ...';

            default: return null;
        }
    }

    render() {
        const { state } = this;

        return (
            <div className='cb'>
                {this.contentRender()}
                <div className={styles.categoryCrumb}>
                    <Icon type='view-list' className={styles.categoryCrumbIcon} />
                    {state.paths.map((path, index, array) => {
                        return (
                            <>
                                <span
                                    onClick={() => this.onJump(index + 1)}
                                    className={index + 1 === array.length ? styles.categoryLinkOn : styles.categoryLink}
                                >{path.name}</span>
                                {index < array.length - 1
                                    ? <span className={styles.categorySlash}>/</span>
                                    : null}
                            </>
                        );
                    })}
                </div>
                <div className={styles.categoryAction}> 
                    <CategoryEditor className={styles.tabExtraIcon} render={component => <Button onClick={component.onVisible}> 新建分类 </Button>} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ notes, users }) => {
    return {
        categories: notes.categories,
        created_by: users.id
    };
};
const actionCreators = {
    getCategories
};

export default connect(mapStateToProps, actionCreators)(Category);