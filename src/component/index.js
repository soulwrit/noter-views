import '../../../react/dist/css/main.css';
import './index.scss';
import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import { Loading, ErrorBoundary } from '@writ/react';
import { setConfig as setRequestConfig } from '@writ/utils/request-fetch';
import { observer } from '../utils/redux';

import { setUserRequired } from './User/reducers';
import { store } from './store';
import { API_HOST } from './env';
import routes from './routes';

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
        host: API_HOST,
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

                if (props.history) {
                    props.history.push(routes.login.path);
                }
            }
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