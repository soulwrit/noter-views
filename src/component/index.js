import '../../../react/dist/css/main.css';
import './index.scss';
import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import { Loading, ErrorBoundary, toast } from '@writ/react';
import { setConfig as setRequestConfig } from '@writ/utils/request-fetch';
import { observer } from '../utils/redux';

import { store } from './store';
import routes from './routes';
import { setUserRequired } from '../reducers/users';

window.DEV = process.env.NODE_ENV === 'development';
const mapStateToProps = function (state) {
    return {
        token: state.users.token
    };
};
const mapDispatchToProps = { setUserRequired };
const HOC = connect(mapStateToProps, mapDispatchToProps)(function APP(props) {
    const headers = {
        'Content-Type': 'application/json;charset=utf-8'
    };
    setRequestConfig({
        host: {
            default: 'http://localhost:9004'
        },
        options: {
            mode: 'cors',
            headers,
        },
        onSuccess(res) {
            if (res.status === 401) {
                props.setUserRequired({
                    id: undefined,
                    token: undefined
                });

                return props.history.push(routes.login.path);
            }
        },
        onError(err) {
            toast.error(err.message);
        }
    });
    if (props.token) {
        headers.Authorization = props.token;
    }
    observer.on((state, remove) => {
        headers.Authorization = state.users.token;
        remove();
    });
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route {...routes.test} />
                <Route {...routes.login} />
                <Route {...routes.register} />
                <Route {...routes.notFound} />
                <Route {...routes.index} />
                <Redirect from='/' to={routes.login.path} />
            </Switch>
        </Suspense>
    );
});
export default function Index() {
    observer.store(store);
    return React.createElement(ErrorBoundary, {
        children: React.createElement(Provider, {
            store,
            children: React.createElement(BrowserRouter, {
                basename: '/',
                children: React.createElement(HOC, { store })
            })
        })
    });
};