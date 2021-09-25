import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { auth } from '../../../store/act/user_action';
import Loadingscreen from '../views/loading';

export default function adminauth(ComposedClass, reload) {

    const AuthenticationCheck = (props) => {
        const userprops = useSelector(state => state.user);
        const dispatch = useDispatch();
        const [loading, loadingHandler] = useState(false);

        const getclientData = useCallback( async () => {
            let getauth = await dispatch(auth());
            return getauth;
        }, [dispatch])

        useEffect(() => {
            let mounted = true;
            async function authCheck() {
                try {
                    loadingHandler(true);
                    let getauth = await getclientData();
                    let user = getauth.payload;
                    
                    if(mounted){
                        if (!user.isAuth) {
                            if (reload) {
                                props.history.push('/auth')
                            }
                        } else {
                            if (reload === false) {
                                props.history.push('/')
                            } 
                        }
                        loadingHandler(false);
                    }
                } catch (error) {
                    console.log(error, "error")
                }
            }
            authCheck();
            return () => {
                mounted = false;
            }
        }, [dispatch, props.history, getclientData])

        if (loading) {
            return (
                <Loadingscreen />
            )
        }
        return (
            <ComposedClass {...props} user={userprops} />
        );

    }

    return AuthenticationCheck;
}

