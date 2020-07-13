import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Icon, Input, Form, toast, Text, Button } from '../lib';
import { useWebsocket } from '../../utils/websocket';
import styles from './ChatBox.module.scss';

import Timeline from './Timeline';
import LoginError from './LoginError';
import UserMsg from './MsgUser';
import MineMsg from './MsgMine';

class ChatBox extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            message: [
                { content: '你是谁？', id: 2, uname: '未知者', }
            ],
        };
        this.form = Form.create({
            content: {
                placeholder: '请在这里输入你想发送的消息',
                validate(value) {
                    if (!value) {
                        return '请输入信息内容！';
                    }
                }
            }
        });
    }
    componentDidMount() {
        useWebsocket('ws://localhost:9004/socket?uuid=' + this.props.uid, {
            onError: error => {
                // 连接出错
                this.msgAreaRender(LoginError, { error, info: '登录失败，将使用传统方式进行交互！' });
            },
            onData: data => {
                // 接收数据

            },
            onOpen: e => {
                // 上线
                this.msgAreaRender(Timeline, { time: Date.now() });
            },
            onClose: () => {
                // 下线

            }
        });
    }
    msgAssignRef = ref => {
        this.msgAreaRef = ref;
    }
    msgAreaRender(Component, props) {
        const box = document.createElement('div');

        box.className = styles.msgAreaBox;
        this.msgAreaDOM = ReactDOM.findDOMNode(this.msgAreaRef);
        this.msgAreaDOM.appendChild(box);
        ReactDOM.render(React.createElement(Component, props), box);
    }
    scrollBottom() {
        if (!this.msgAreaDOM) {
            this.msgAreaDOM = ReactDOM.findDOMNode(this.msgAreaRef);
        }

        if (this.msgAreaDOM) {
            this.msgAreaDOM.scrollTop = this.msgAreaDOM.scrollHeight - this.msgAreaDOM.clientHeight;
        }
    }
    sendMessage() {
        try {
            const data = this.form.json();

            this.setState({
                message: this.state.message.concat({
                    content: data.content,
                    uname: '系统管理员',
                    uid: this.props.uid
                })
            }, () => {
                this.scrollBottom();
            });
        } catch (error) {
            toast.error(error.message);
        }
    }
    onSendMessage = () => {
        this.sendMessage();
    }
    onEnterSend = e => {
        if (e.ctrlKey && e.keyCode === 13) {
            this.sendMessage();
        }
    }
    render() {
        const { type } = this.props;
        const { message } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.msg} ref={this.msgAssignRef}>
                        <div className={styles.msgMore}>
                            <Text value='消息获取中 ......' />
                        </div>
                        {message.map((item, i) => <MineMsg key={i} data={item} />)}
                    </div>
                    <div className={styles.edit}>
                        <div className={styles.editMenu}>信息条</div>
                        <div className={styles.editEnter} onKeyUp={this.onEnterSend}>
                            <Input.Textarea  model={this.form.fields.content} />
                        </div>
                        <div className={styles.editSent}>
                            <Text value='按下`Ctrl + Enter` 发送消息' />
                            <Button className={styles.editSentBtn} size='sm' onClick={this.onSendMessage}>发送</Button>
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    {type === 1 ? null : (
                        <>
                            <div className={styles.member}>
                                <Text theme='dark' type='div' className={styles.memberTit}>
                                    <Icon type='account' className={styles.icon} />组织成员
                                    </Text>
                                <div className={styles.memberBox}></div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        uid: state.users.id
    };
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);