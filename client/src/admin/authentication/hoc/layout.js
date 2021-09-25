import React from 'react';

const AuthLayout = (props) => {
    return (
        <div id="authentication">
            {props.children}
        </div>
    );
}

export default AuthLayout;