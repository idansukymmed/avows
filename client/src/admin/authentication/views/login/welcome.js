import React from 'react';

import {
    IoSendSharp
} from "react-icons/io5";

const WelcomeScreen = ({
    formstyle,
    authentication,
    goToDashboard
}) => {
    return (
        <div className="loginBody">
            <div className="row">
                <div className="demmy-md-12">
                    <div className="welcomeWrapper">
                        <div className="welcomeColumn">
                            <div className="center">{authentication && authentication.name}</div>
                            <div className="center">({authentication && authentication.nickname})</div>
                            <div className="center">{authentication && authentication.email}</div>
                            <div className="center">{authentication && authentication.extension}{authentication && authentication.phone}</div>
                        </div>
                    </div>
                </div>
                <div className="demmy-md-12">
                    <div
                        className="interval"
                        style={{
                            marginTop: 42
                        }}
                    >Click button below to continue</div>
                    <div className="rightSideFormSubmit">
                        <div
                            className="iconPositionSubmit"
                            onClick={(event) => goToDashboard(event)}
                        >
                            <IoSendSharp
                                className="icon agraicon"
                                style={{
                                    color: formstyle.formiconcolour,
                                    marginLeft: 3
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;