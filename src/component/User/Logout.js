import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast, confirm } from '@writ/react';
import { http } from '@writ/utils/request-fetch';

import { onLogoutModal, setUserRequired } from '../../reducers/users';
import routes from '../routes';

const Logout = props => {
    const { history, keepalive, onVisible, setUserRequired, visible, } = props;

    useEffect(() => {
        if (visible) {
            confirm('您确定要退出系统吗？').then(isConfirm => {
                onVisible();
                if (!isConfirm) return;
                try {
                    http.post('/user/logout').then(res => {
                        if (res.code) {
                            throw new Error(res.msg);
                        }
                        if (!keepalive) {
                            setUserRequired({
                                id: undefined,
                                token: undefined
                            });
                        }
                        history.push(routes.login.path);
                    }).catch(err => {
                        toast.error(err.message);
                    });
                } catch (err) {
                    toast.error(err.message);
                }
            });
        }
    }, [visible]);

    return null;
};
const mapStateToProps = function (state, props) {
    return {
        visible: state.users.modalLogout || props.visible,
        keepalive: state.users.keepalive
    };
};
const mapDispatchToProps = {
    setUserRequired,
    onVisible: onLogoutModal
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));