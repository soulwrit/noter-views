import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast, confirm } from '@writ/react';
import { http } from '@writ/utils/request-fetch';

import { clsUserRequired } from './reducers/required';
import { closeUserLogout } from './reducers/logout';
import routes from '../routes';

const Logout = props => {
    const { history, keepLogin, closeUserLogout, clsUserRequired, visible, } = props;

    useEffect(() => {
        if (visible) {
            confirm('您确定要退出系统吗？').then(isConfirm => {
                closeUserLogout();
                if (!isConfirm) return;
                try {
                    http.post('/user/logout').then(res => {
                        if (res.code) {
                            throw new Error(res.msg);
                        }
                        history.push(routes.login.path);
                        if (keepLogin) {
                            return;
                        }
                        clsUserRequired();
                    }).catch(err => {
                        toast.error(err.message);
                    });
                } catch (err) {
                    toast.error(err.message);
                }
            });
        }
    }, [visible, keepLogin]);

    return null;
};
const mapStateToProps = function (state) {
    return {
        visible: state.users.logout.visible,
        keepLogin: state.users.login.checked
    };
};
const mapDispatchToProps = {
    clsUserRequired, closeUserLogout
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));