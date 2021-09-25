import React from 'react';

import FormField from './formfield';

import {
    IoText,
    IoSendSharp,
    IoMail
} from "react-icons/io5";

const FirstScreen = ({
    formstyle,
    formdatafirst,
    firstTimeForm,
    formError,
    formSuccess,
    errorMessage,
    updateProfile
}) => {
    return (
        <div className="loginBody">
            <div className="row">
                <div
                    className="demmy-md-12"
                    style={{
                        marginBottom: 35
                    }}
                >
                    <div className="iconPosition">
                        <IoText
                            className="icon agraicon"
                            style={{
                                color: formstyle.formiconcolour
                            }}
                        />
                    </div>
                    <FormField
                        id={'name'}
                        formdata={formdatafirst.name}
                        change={(element) => firstTimeForm(element)}
                        myclass={'form-control'}
                    />
                </div>
                <div
                    className="demmy-md-12"
                    style={{
                        marginBottom: 35
                    }}
                >
                    <div className="iconPosition">
                        <IoMail
                            className="icon agraicon"
                            style={{
                                color: formstyle.formiconcolour
                            }}
                        />
                    </div>
                    <FormField
                        id={'email'}
                        formdata={formdatafirst.email}
                        change={(element) => firstTimeForm(element)}
                        myclass={'form-control'}
                    />
                </div>
                <div
                    className="demmy-md-12"
                    style={{
                        marginBottom: 35
                    }}
                >
                    <div className="iconPosition">
                        <IoText
                            className="icon agraicon"
                            style={{
                                color: formstyle.formiconcolour
                            }}
                        />
                    </div>
                    <FormField
                        id={'nickname'}
                        formdata={formdatafirst.nickname}
                        change={(element) => firstTimeForm(element)}
                        myclass={'form-control'}
                    />
                </div>
                <div
                    className="demmy-md-12"
                    style={{
                        marginBottom: 35
                    }}
                >
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
                <div className="demmy-md-12">
                    <div 
                    className="rightSideFormSubmit"
                    style={{
                        marginTop: 10
                    }}
                    >
                        <div className="row">
                            <div className="demmy-md-12">
                                <div
                                    className="iconPositionSubmit"
                                    onClick={(event) => updateProfile(event)}
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
        </div>
    );
};

export default FirstScreen;