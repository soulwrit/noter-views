import React from 'react';
import { Link } from 'react-router-dom';
import { message, Icon, Pagination } from 'antd';

import Editor from './editor';
import Message from './message';
import comment from '../../../models/comment';
import sign from '../../../models/sign';
import user from '../../../models/user';
import { emitter, EVENTS, unique, dateToLocaleString } from './utils';

const defaultState = {
    message: null,
    dataset: [],
    total: 0,
    userInfo: sign.status,
    pageNo: 1,
    pageSize: 10,
    project: 1,
    subject: 1,
    father: 0,
    replySymbol: ' @ '
};

const greatCached = {
    key: 'commentGreat',
    stroe: services.store,

    get(data) {
        const { key, stroe } = this;

        if (stroe.has(key)) {
            const cached = stroe.get(key);
            if (Array.isArray(cached) && cached.includes(data.id)) {
                return true
            }
        }
    },

    set(data) {
        const { key, stroe } = this;

        if (stroe.has(key)) {
            const cached = stroe.get(key);

            cached.push(data.id);
            stroe.set(key, cached);
        } else {
            stroe.set(key, [data.id]);
        }
    }
};

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: defaultState.message,
            dataset: defaultState.dataset,
            total: defaultState.total,
            userInfo: defaultState.userInfo,
            pageNo: defaultState.pageNo,
            pageSize: defaultState.pageSize,
            project: defaultState.project,
            subject: defaultState.subject,
            father: defaultState.father,
            replySymbol: defaultState.replySymbol
        }

        this.canGreat = true; // 是否可以点赞
        this.canReply = true; // 是否可以回复
        this.canDelete = true; // 是否可以删除
    }

    componentWillMount() {
        this.getComments();
    }

    getComments() {
        const { target } = this.props;
        const { state } = this;
        const body = {
            pageNo: state.pageNo,
            pageSize: state.pageSize,
            project: state.project,
            subject: state.subject,
            target: target.id,
            updated_at: 'DESC',
            status: 'DESC'
        };

        comment.acquire(body).then(res => {
            if (res && res.code === 0) {
                const data = res.data;

                const ids = data.rows.map(item => item.user);

                return user.getUserInfoByIds({ ids: unique(ids) }).then(res => {
                    if (res && res.code === 0) {
                        const users = res.data;

                        data.rows.map(item => {
                            for (let usr of users) {
                                if (usr.id === item.user) {
                                    item.user = usr;
                                    break;
                                }
                            }
                        });

                        this.setState({
                            dataset: data.rows,
                            total: data.count
                        });

                        return;
                    }
                    throw new Error(res && res.code ? res.msg : '获取评论用户信息失败')
                }).catch(err => {
                    throw err;
                });
            }
            throw new Error(res && res.code ? res.msg : '评论获取失败');
        }).catch(err => {
            message.error('评论拉取失败，错误提示: ' + err.message)
        });
    }

    // 分页变化
    onPageChange = (pageNo, pageSize) => {
        this.setState({ pageNo, pageSize });
        this.getComments();
    };


    onMsgChange = (value) => {
        this.setState({ message: value });
    }
    onMsgSubmit = (value, voice) => {
        const { state } = this;
        const { target } = this.props;
        if (message) {
            comment.create({
                user: state.userInfo.id,
                project: state.project,
                subject: state.subject,
                target: target.id,
                father: state.father,
                body: state.message,
                voice: voice
            }).then(res => {
                if (res && res.code === 0) {
                    this.resetState();
                    this.getComments();

                    emitter.emit(EVENTS.TEXTAREA_CLEAN);
                    message.info('评论发表成功');
                    return;
                }
                throw new Error(res && res.code ? res.msg : '评论提交失败');
            }).catch(err => {
                message.error(err.message);
            });
        }
    }

    resetState() {
        this.setState({
            message: defaultState.message,
            father: defaultState.father
        });
    };

    onReport = (data) => {
        const { state } = this;
        const { target } = this.props;
        comment.update({
            project: state.project,
            subject: state.subject,
            target: target.id,
            id: data.id,
            status: 3
        }).then(res => {
            if (res && res.code === 0) {
                return message.success('举报成功,请等待管理员处理 !');
            }
            throw new Error('举报失败，可能是我们的问题，您可以在反馈中心上报此问题!');
        }).catch(err => {
            message.error(err.message);
        });
    };
    onRemove = (data) => {
        const { state } = this;
        const { target } = this.props;
        comment.delete({
            project: state.project,
            subject: state.subject,
            target: target.id,
            id: data.id
        }).then(res => {
            if (res && res.code === 0) {
                message.info('评论删除成功!');

                return this.getComments();
            }

            throw new Error('评论删除失败，原因不明确，请联系开发者');
        }).catch(err => {
            message.error(err.message);
        })
    };
    onGreat = (data) => {
        if (greatCached.get(data)) {
            return;
        }
        const { state } = this;
        const { target } = this.props;
        comment.update({
            project: state.project,
            subject: state.subject,
            target: target.id,
            id: data.id,
            great: 1
        }).then(res => {
            if (res && res.code === 0) {
                greatCached.set(data);
                message.success('点评成功');
                return this.getComments();
            }
            throw new Error('评论发表失败');
        }).catch(err => {
            message.error(err.message);
        });
    };

    getMessageProps(data, key, parent) {
        const { userInfo } = this.state;
        const usr = data.user;
        const userLink = `/other/${usr.id}`;

        const getTitle = () => {
            if (parent) {
                return (
                    <span>
                        <Link to={userLink}>{usr.name}</Link>
                        <span>{this.state.replySymbol}</span>
                        <Link key='userlink' to={`/other/${parent.data.user.id}`}>{parent.data.user.name}</Link>
                    </span>
                )
            }

            return <Link to={userLink}>{usr.name}</Link>;
        }

        const props = {
            key: key,
            index: key,
            avator: (
                <div className='avt-ico'>
                    <Link to={userLink}>{usr.avatar ?
                        (<img src={services.image.getPath(usr.avatar)} />) :
                        (<Icon type='user' />)
                    }</Link>
                </div>
            ),
            title: getTitle(),
            extra: [
                <span className='cnt-act cnt-warn' key='report' onClick={() => this.onReport(data)}>
                    <Icon type='warning' theme='filled' /> 举报
                </span>
            ],
            content: data.body,
            notation: [dateToLocaleString(data.created_at)],
            actions: []
        };

        if (this.canReply) {
            props.actions.push(
                <span className='cnt-act' key='reply' onClick={() => {
                    this.setState({
                        father: data.id
                    });
                    emitter.emit(EVENTS.MESSAGE_SHOW_CHILDREN + key);
                }}>
                    <Icon type='message' />回复
                </span>
            )
        }

        if (this.canDelete && userInfo.id === usr.id) {
            props.actions.push(
                <span className='cnt-act' key='remove' onClick={() => this.onRemove(data)}>
                    <Icon type='delete' />删除
                </span>
            );
        }

        if (this.canGreat) {
            props.actions.push(
                <span className='cnt-act' key='great' onClick={() => this.onGreat(data)}>
                    <Icon type='like' theme={greatCached.get(data) ? 'filled' : 'outlined'} />点赞 {data.great}
                </span>
            );
        }

        return props;
    }

    getMessageComponent(prop) {
        return <Message {...prop}>{this.renderEditorCommonent(prop.index)}</Message>
    }

    renderMessageComponent() {
        const { dataset } = this.state;
        const components = [];
        if (dataset.length > 0) {
            const props = {};

            dataset.forEach(item => {
                props[item.id] = { nested: [], data: item };
            });
            dataset.forEach((item, idx) => {
                const parent = item.father > 0 ? props[item.father] : null;
                let prop = Object.assign(props[item.id], this.getMessageProps(item, idx, parent));

                if (parent) {
                    prop.indent = true;
                    parent.nested.push(this.getMessageComponent(prop));
                } else {
                    components.push(this.getMessageComponent(prop));
                }
            });
        } else {
            components.push(<div className='cmt-empty' key='NCM'>暂无评论...</div>);
        }

        return components;
    }

    renderEditorCommonent(index) {
        return <Editor maxSize={500} index={0 || index} size='large' theme='primary' onChange={this.onMsgChange} onSubmit={this.onMsgSubmit}></Editor>
    }

    render() {
        const { target } = this.props;
        return target ? (
            <div className='dc-cmt cmt'>
                <div className='cmt-tit'>
                    <Icon type='message' /> 留言评论({this.state.total})
                </div>
                {this.renderEditorCommonent()}
                {this.renderMessageComponent()}
                <div className='cmt-page'>
                    <Pagination total={this.state.total} onChange={this.onPageChange} hideOnSinglePage />
                </div>
            </div>
        ) : (<div>缺少可评论对象</div>)
    }
}

Comment.propTypes = {}
Comment.defaultProps = {}
