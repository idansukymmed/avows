import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { auth } from '../../store/act/user_action';
import { getProducts } from '../../store/act/product_action';

import DashboardScreen from './views/dashboard';
import Loadingscreen from '../authentication/views/loading';


import '../adminresources/admin.css';
import Auth from './hoc/auth';
import NoMatch from './views/nomatch';

const MainLayout = (props) => {

    const dispatch = useDispatch();
    const [loadingadmin, loadingadminHandler] = useState(false);

    // const userprops = useSelector(state => state.user && state.user.userData);

    useEffect(() => {
        let mounted = true;
        async function getAuth() {
            try {
                loadingadminHandler(true);
                if (mounted) {
                    // dispatch(auth());
                    let getauth = await dispatch(auth());
                    let user = getauth.payload;
                    if (user.isAuth) {
                        dispatch(getProducts()).then(response => {
                            if(response.payload.success){
                                loadingadminHandler(false);
                            }
                        })
                    }
                    if (!user.isAuth) {
                        loadingadminHandler(false);
                    }
                }
            } catch (error) {

            }
        }
        getAuth()
        return () => {
            mounted = false;
        }
    }, [dispatch])

    // async function fetchData(URL) {
    //     return URL.then(function (response) {
    //         if (response.payload.success) {
    //             return response.payload
    //         }
    //     }).catch(function (error) {
    //         return { success: false };
    //     });
    // }

    // return (
    //     <Switch>
    //         <Route path="/" exact component={Auth(DashboardScreen, true)} />
    //         <Route component={NoMatch} />
    //     </Switch>
    // );
    if (loadingadmin) {
        return (
            <Loadingscreen />
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact component={Auth(DashboardScreen, true)} />
                <Route component={NoMatch} />
            </Switch>
        );
    }
}

export default MainLayout;