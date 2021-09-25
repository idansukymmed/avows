import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LumisoftLogin from './admin/authentication/routes';
import MainAdministrator from './admin/main/routes';

const Routes = () => {
    return (
        <Switch>
            <Route path="/auth" component={LumisoftLogin} />
            <Route path="/" component={MainAdministrator} />
        </Switch>
    );
}

export default Routes;