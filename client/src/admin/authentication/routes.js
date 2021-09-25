import React from 'react';
import { Switch, Route } from 'react-router-dom';

import '../adminresources/admin.css';

import AuthLayout from './hoc/layout';
import Auth from './hoc/auth';

import AuthLogin from './views/login';
import AuthLogout from './views/logout';
import NoMatch from './views/nomatch';

const AuthLoginLayout = () => {
    // console.log(props)
    return (
        <AuthLayout>
            <Switch>
                <Route path="/auth/logout" exact component={Auth(AuthLogout, true)} />
                <Route path="/auth" exact component={Auth(AuthLogin, false)} />
                <Route component={Auth(NoMatch)} />
            </Switch>
        </AuthLayout>
    );
};

export default AuthLoginLayout;