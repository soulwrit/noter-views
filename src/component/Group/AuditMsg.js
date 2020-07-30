import React from 'react';
import { connect } from 'react-redux';
import { Icon, Text, Pager, toast, Placeholder } from '../lib';

import styles from './AuditMsg.module.scss';
import { http } from '@writ/utils/request-fetch';
import date from '../../utils/date';
import { onJoinGroupAuditModal } from '../../reducers/groups';
import { onProfileModal } from '../User/reducers';
import getAuditMsg from '../../utils/getAuditMsg';

const Link = function (props) {
    return React.createElement('span', {
        onClick: props.onClick,
        children: props.value,
        className: styles.link,
    });
}
class AuditMsg extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            list: [],
            total: 0
        };
        this.params = {
            pageNo: props.pageNo,
            pageSize: props.pageSize,
            uid: props.uid,
        };
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        http.get('/grp/msg', this.params).then(res => {
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
        const { state, params, props } = this;

        return state.total === 0 ? <Placeholder value='暂无验证信息' />
            : (<>
                {state.list.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <Text className={styles.time} value={date.format(item.created_at, 'hh:mm dd/MM/yyyy')} />
                        {getAuditMsg(
                            item.req,
                            <Link value={item.name} onClick={() => this.props.onUserProfile(item.id)} />,
                            <Link value={item.gname} onClick={() => this.props.onGroupProfile(item.gid)} />
                        )}
                        <div className={styles.acts} req={item.req}>
                            {item.req === 1 || item.req === 4 ?
                                <>
                                    <span className={styles.act} onClick={() => props.onJoinGroupAudit({
                                        ...item,
                                        req: item.req === 1 ? 2 : 5,
                                    })}>同意</span>
                                    <span className={styles.act} onClick={() => props.onJoinGroupAudit({
                                        ...item,
                                        req: item.req === 1 ? 3 : 6
                                    })}>拒绝</span>
                                </> : null
                            }
                        </div>
                    </div>
                ))}
                <Pager
                    total={Math.ceil(state.total / params.pageSize)}
                    pageNo={params.pageNo}
                    pageSize={params.pageSize}
                    onChange={this.onPagerChange}
                    prev={<Icon type="back" />}
                    next={<Icon type="more" />}
                />
            </>);
    }
}
const mapStateToProps = function (state) {
    return {
        pageNo: 1,
        pageSize: 10,
        uid: state.users.id,
    };
};
const mapDispatchToProps = {
    onJoinGroupAudit: onJoinGroupAuditModal,
    onUserProfile: onProfileModal
};
export default connect(mapStateToProps, mapDispatchToProps)(AuditMsg);