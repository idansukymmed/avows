import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import Loadingscreen from '../loading';
import { logoutUser, auth } from '../../../../store/act/user_action';
import { getProducts } from '../../../../store/act/product_action';

const LogoutScreen = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        async function Logout() {
            try {
                if (mounted) {
                    let getlogout = await dispatch(logoutUser());
                    if (getlogout.payload.success) {
                        dispatch(auth()).then(response => {
                            dispatch(getProducts()).then(product => {
                                history.push('/auth');
                            })
                        })
                        
                    }
                }

            } catch (error) {

            }
        }
        Logout();
        return () => {
            mounted = false;
        }
    }, [dispatch, history])

    return (
        <Loadingscreen />
    );

}

export default LogoutScreen;