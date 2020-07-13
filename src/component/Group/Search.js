import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, toast, Avatar, Grid, Tag, Text } from '../lib';

import styles from './index.module.scss';
import { http } from '@writ/utils/request-fetch';
import date from '../../utils/date';
import Def_PNG from '../Index/default.png';

import { onJoinGroupModal } from '../../reducers/groups';
import JoinGroup from './JoinGroup';

const SearchNull = function (props) {
    return (
        <div>
            没有检索到与‘<Text theme='success'>{props.name}</Text>’相关群组
        </div>
    );
};
const SearchHold = function () {
    return <Text>请在输入框里键入需要查找的群组名</Text>;
};
const Action = function (props) {
    return props.shown ? (
        <Tag size='xs' theme='primary' title={props.title} onClick={props.onClick}>
            <Icon type={props.icon} />
        </Tag>
    ) : null;
};
class Search extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            result: [],
            name: undefined
        };
        this.form = Form.create({
            name: {
                required: true,
                placeholder: '请输入群组名称',
                validate(value) {
                    if (!value) {
                        return '请输入群组名称'
                    }
                    if (value.length > 50) {
                        return '群组名称长度不大于50';
                    }
                }
            }
        });
    }
    onSubmit = () => {
        try {
            const { name } = this.form.json();

            this.setState({ name });
            http.get('/grp/sea', { name }).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                this.setState({
                    result: res.data
                });
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            this.setState({ name: undefined });
            toast.error(err.message);
        }
    }
    render() {
        const { props, state } = this;
        const { result, name } = state;

        return (
            <Grid dir='ttr' style={{ height: '100%' }}>
                <Grid.Cell span={2}>
                    <h5 className={styles.title}>群组检索</h5>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Item model={this.form.fields.name}>
                            <Input model={this.form.fields.name} maxLength={50} width={220} />
                            <Button><Icon type='search' /></Button>
                        </Form.Item>
                    </Form>
                    <h5 className={styles.title}>检索结果</h5>
                </Grid.Cell>
                <Grid.Cell span={7} style={{ overflow: 'auto' }}>
                    {!result.length
                        ? !!name ? <SearchNull name={name} /> : <SearchHold />
                        : (
                            <div className={styles.cardBox}>{result.map((data, i) => {
                                const mine = data.uid === props.uid;
                                return (
                                    <div className={styles.sCard} key={i} style={i % 2 === 0 ? { marginRight: '3%' } : null}>
                                        <div className={styles.sCardImg}>
                                            <Avatar src={Def_PNG} title={data.name} size='lg' />
                                            <h5>{data.name}</h5>
                                            <div className={styles.sCardAct}>
                                                <Action shown={true} onClick={props.onLook} title='详情' icon='search' />
                                                <Action shown={!mine} onClick={props.onJoin} title='加入' icon='add' />
                                            </div>
                                            {!mine && props.modalJoinGroup ? <JoinGroup member={{ id: props.uid }} group={data} /> : null}
                                        </div>
                                        <div className={styles.sCardTit}>
                                            <p className={styles.sCardAuthor} onClick={props.onUser}>
                                                <a><Icon type='account' /> {data.username}</a>
                                            </p>
                                            <p className={styles.sCardCreatedAt}>
                                                <Icon type='account' /> {date.format(data.created_at, 'MM/dd/yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}</div>
                        )
                    }
                </Grid.Cell>
            </Grid>
        );
    }
}
const mapStateToProps = function ({ groups, users }) {
    return {
        modalJoinGroup: groups.modalJoinGroup,
        uid: users.id
    };
};
const mapDispatchToProps = {
    onJoin: onJoinGroupModal,
    onLook: () => { },
    onUser: () => { }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);