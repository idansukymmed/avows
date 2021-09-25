import React from 'react';

import FormField from './formfield';

import {
    IoShieldCheckmarkSharp,
    IoSendSharp
} from "react-icons/io5";

const LoginScreenPage = ({
    changeCountryCode,
    formstyle,
    dialcode,
    formdata,
    updateForm,
    formError,
    errorMessage,
    formSuccess,
    countries,
    submitMyPhoneNumber
}) => {
    return (
        <div className="loginBody">
            <div className="row">
                <div className="demmy-md-12">
                    <div className="countryButtonWrapper">
                        {
                            countries.map((country, index) => {
                                return (
                                    <div
                                        className="countryButton"
                                        key={index}
                                        style={{
                                            border: country.countryCode === dialcode.countryCode ? '1px solid rgba(255,255,255,0.3)' : null
                                        }}
                                        onClick={() => changeCountryCode(country)}
                                    >{country.countryCode}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="demmy-md-12" style={{marginTop: 10}}>
                    <div className="iconPosition">
                        <IoShieldCheckmarkSharp
                            className="icon agraicon"
                            style={{
                                color: formstyle.formiconcolour
                            }}
                        />
                        <div
                            className="dialCode"
                            style={{
                                color: formstyle.formiconcolour
                            }}
                        >{dialcode.dialCode}</div>
                    </div>
                    <FormField
                        id={'phone'}
                        formdata={formdata.phone}
                        change={(element) => updateForm(element)}
                        myclass={'form-control'}
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
                <div className="demmy-md-12">
                    <div className="rightSideFormSubmit">
                        <div
                            className="iconPositionSubmit"
                            onClick={(event) => submitMyPhoneNumber(event)}
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

export default LoginScreenPage;