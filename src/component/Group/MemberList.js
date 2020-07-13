import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Text, Icon, Avatar, Pager, toast, Table } from '../lib';

import { http } from '@writ/utils/request-fetch';
import date from '../../utils/date';
import Def_avatar from '../User/avatar.jpg';
import { onFireMemberModal } from '../../reducers/groups';

class MemberList extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            list: [],
            total: 0
        };
        this.params = {
            id: props.id,
            pageNo: props.pageNo,
            pageSize: props.pageSize,
        };
        this.columns = [
            { key: 'name', value: '成员', },
            { key: 'role', value: '角色', },
            { key: 'updated_at', value: '加入时间', },
            { key: 'op', value: '操作', },
        ];
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        http.get('/mem/ls', this.params).then(res => {
            if (res.code > 0) {
                throw new Error(res.msg);
            }
            this.setState({
                total: res.data.total,
                list: res.data.rows
            });
        }).catch(error => {
            toast.error(error.message);
        });
    }
    onPagerChange = (pageNo, pageSize) => {
        this.params.pageNo = pageNo;
        this.params.pageSize = pageSize;
        this.getList();
    }

    render() {
        const { onFireMember, roles } = this.props;
        const { state, params, columns } = this;

        return (
            <>
                <Table columns={columns} source={state.list} hover>
                    <Table.Column render={(item, key) => <Avatar size='2x' src={Def_avatar} title={item[key]} />} />
                    <Table.Column render={(item, key) => roles[item[key]]} />
                    <Table.Column render={(item, key) => {
                        return <Text>{date.format(item[key], 'MM/dd/yyyy')}</Text>;
                    }} />
                    <Table.Column render={item => {
                        return (
                            <>
                                <Button size='xs' theme='muted' onClick={() => onFireMember(item)}>
                                    <Icon type='skip' />踢出
                                </Button>
                                <Button size='xs' theme='muted' onClick={() => onFireMember(item)}>
                                    <Icon type='setting' />设置
                                </Button>
                            </>
                        );
                    }} />
                </Table>
                <Pager
                    total={Math.ceil(state.total / params.pageSize)}
                    pageNo={params.pageNo}
                    pageSize={params.pageSize}
                    onChange={this.onPagerChange}
                    prev={<Icon type="back" />}
                    next={<Icon type="more" />}
                />
            </>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        pageNo: 1,
        pageSize: 20,
        roles: state.statics.roles
    };
};
const mapDispatchToProps = {
    onFireMember: onFireMemberModal
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberList);

if (window.DEV) {
    MemberList.propTypes = {
        id: PropTypes.number.isRequired
    };
}