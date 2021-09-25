import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function websitehocauth(
    ComposedClass,
    restricted
) {

    const AuthenticationCheck = (props) => {

        const user = useSelector(state => state.user.userData);
        const dispatch = useDispatch();

        useEffect(() => {
            let mounted = true;
            async function authCheck() {
                try {
                    if (mounted) {
                        // console.log('te12313213213st')
                        if (user && user.isAuth) {
                            // console.log('test')
                            if (restricted === false) {
                                props.history.push('/')
                            }
                            // if(authentication.isFirstTime){
                            //     dispatch(rightDrawerOpen(true))
                            // }
                        } else {
                            // console.log(restricted, 'test2')
                            if (restricted) {
                                props.history.push('/auth')
                            }
                        }
                    }

                } catch (error) {

                }

                // loadingHandler(false);
            }
            authCheck();
            return () => {
                mounted = false;
            }
        }, [user, props.history, dispatch])

        return (
            <ComposedClass {...props} />
        );
        
    }
    return AuthenticationCheck;
}

