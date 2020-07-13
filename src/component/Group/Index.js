import styles from './index.module.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Avatar, Text, Accordion, Icon, Grid, toast, ViewBox, ViewArea, ViewLink, PageTurn } from '../lib';

import { http } from '@writ/utils/request-fetch';
import Def_PNG from '../Index/default.png';

import { onGroupModal, onGroupProfileModal } from '../../reducers/groups';
import Editor from './Editor';
import Search from './Search';

class Index extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            list: {
                [props.KEY.joined]: {
                    rows: [],
                    total: 0,
                },
                [props.KEY.mine]: {
                    rows: [],
                    total: 0,
                }
            }
        };
        this.list = [
            {
                name: '我创建的群组',
                key: props.KEY.mine,
                url: '/grp',
                pageNo: 1,
                pageSize: 10
            },
            {
                name: '我加入的群组',
                key: props.KEY.joined,
                url: '/grp/i',
                pageNo: 1,
                pageSize: 10
            },
        ]
    }
    getList(item) {
        if (!this.props.created_by) {
            return;
        }
        http.get(item.url, {
            created_by: this.props.created_by,
            pageNo: item.pageNo, pageSize: item.pageSize
        }).then(res => {
            if (res.code) {
                throw new Error(res.msg);
            }
            this.setState({
                list: Object.assign({}, this.state.list, {
                    [item.key]: {
                        rows: res.data.rows,
                        total: res.data.total,
                    }
                })
            });
        }).catch(err => {
            toast.error(err.message);
        });
    }
    render() {
        const { KEY, key, visible, onVisible } = this.props;

        return (
            <Modal visible={visible} width={700} height={500} onClose={onVisible}>
                <Grid className={styles.profile}>
                    <Grid.Cell span={3} className={styles.grpList}>
                        <h5 className={styles.title}>
                            <span>群组列表</span>
                            <span className={styles.titleAction}>
                                <ViewLink to={KEY.new} title='新增群组'>
                                    <Icon type='add' size='2x' className={styles.titleIcon} />
                                </ViewLink>
                                <ViewLink to={KEY.search} title='群组检索' >
                                    <Icon type='search' size='2x' className={styles.titleIcon} />
                                </ViewLink>
                            </span>
                        </h5>
                        <Accordion>
                            {this.list.map(item => {
                                const list = this.state.list[item.key];
                                return (
                                    <Accordion.Item
                                        key={item.key}
                                        value={(opened, onExpand) => (
                                            <>
                                                <Text onClick={() => { onExpand(); this.getList(item); }}>
                                                    <Icon type={opened ? 'unfold' : 'more'} />{item.name}
                                                </Text>
                                                <PageTurn
                                                    total={list.total}
                                                    pageNo={item.pageNo}
                                                    pageSize={item.pageSize}
                                                    onChange={(pageNo, pageSize) => {
                                                        item.pageNo = pageNo;
                                                        item.pageSize = pageSize;
                                                        this.getList(item);
                                                    }}
                                                    up={<Icon type='back' />}
                                                    down={<Icon type='more' />}
                                                />
                                            </>
                                        )}
                                    >
                                        {list.rows.map((data, i) => (
                                            <div key={i} className={styles.grpItem} title={data.intro} onClick={() => this.props.onProfile(data.id)}>
                                                <Avatar src={Def_PNG} size='1x' />
                                                <Text style={{ marginLeft: 10 }}>{data.name}</Text>
                                            </div>
                                        ))}
                                    </Accordion.Item>
                                );
                            })}
                        </Accordion>
                    </Grid.Cell>
                    <Grid.Cell span={6} className={styles.profileCnt}>
                        <ViewBox name='grpv' path={key}>
                            <ViewArea path={KEY.search} component={Search} />
                            <ViewArea path={KEY.new} component={Editor} state={{ created_by: this.props.created_by }} />
                        </ViewBox>
                    </Grid.Cell>
                </Grid>
            </Modal>
        );
    }
}
Index.defaultProps = {
    KEY: {
        new: 'new',
        search: 'search',
        mine: 'mine',
        joined: 'joined'
    },
    key: 'search'
}
const mapStateToProps = function (state) {
    return {
        created_by: state.users.id,
        visible: state.groups.modalIndex,
    }
};
const mapDispatchToProps = {
    onVisible: onGroupModal,
    onProfile: onGroupProfileModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);