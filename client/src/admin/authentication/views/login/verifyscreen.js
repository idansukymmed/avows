import React from 'react';

import FormField from './formfield';

import { Interval } from './interval';

import {
    IoKey,
    IoSendSharp,
    IoReloadSharp
} from "react-icons/io5";

const VerifyScreen = ({
    formstyle,
    formdataverify,
    verifyForm,
    verifyMyPin,
    formError,
    formSuccess,
    timeout,
    errorMessage,
    resendMyPhoneNumber,
    timeoutHandler
}) => {

    const myseconds = 59;

    return (
        <div className="loginBody">
            <div className="row">
                <div className="demmy-md-12">
                    <div className="iconPosition">
                        <IoKey
                            className="icon agraicon"
                            style={{
                                color: formstyle.formiconcolour
                            }}
                        />
                    </div>
                    <FormField
                        id={'verify'}
                        formdata={formdataverify.verify}
                        change={(element) => verifyForm(element)}
                        myclass={'form-control'}
                        maxLength={4}
                        disabled={timeout ? true : formSuccess ? true : false}
                    />

                    {
                        formError ?
                            <div className="errorSubmit">
                                {errorMessage}
                            </div>
                            :
                            formSuccess ?
                                <div className="successSubmit">
                                    PROCESSING, PLEASE WAIT!
                                </div>
                                : null
                    }
                </div>
            </div>
            {
                timeout ?
                    <div className="row">
                        <div className="demmy-md-12">
                            <div
                                className="interval"
                                style={{
                                    marginTop: 42
                                }}
                            >please try again</div>
                            <div className="rightSideFormSubmit">
                                <div className="row">
                                    <div className="demmy-md-12">
                                        <div
                                            className="iconPositionSubmit"
                                            onClick={(event) => resendMyPhoneNumber(event)}
                                        >
                                            <IoReloadSharp
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
                    </div>
                    :
                    formSuccess ? null :
                        <div className="row">
                            <div className="demmy-md-12">
                                <div
                                    className="interval"
                                    style={{
                                        marginTop: 42
                                    }}
                                ><Interval seconds={myseconds} minutes={4} timeoutHandler={timeoutHandler} /></div>
                                <div className="rightSideFormSubmit">
                                    <div className="row">
                                        <div className="demmy-md-12"
                                            style={formError ? {
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'row'
                                            } :
                                                null
                                            }
                                        >
                                            {
                                                formError ?
                                                    <div
                                                        className="iconPositionSubmit"
                                                        style={{
                                                            marginRight: 13
                                                        }}
                                                        onClick={(event) => resendMyPhoneNumber(event)}
                                                    >
                                                        <IoReloadSharp
                                                            className="icon agraicon"
                                                            style={{
                                                                color: formstyle.formiconcolour,
                                                                marginLeft: 3
                                                            }}
                                                        />
                                                    </div>
                                                    : null
                                            }

                                            <div
                                                className="iconPositionSubmit"
                                                onClick={(event) => verifyMyPin(event)}
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
                        </div>
            }
        </div>
    );
};

export default VerifyScreen;