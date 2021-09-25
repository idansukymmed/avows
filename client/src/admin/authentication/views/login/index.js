import React, {
    useState,
    useEffect
} from 'react';

import {
    useSelector,
    useDispatch
} from 'react-redux';

import { useWindowSize } from '../../../main/views/windowsize';
import { update, generateData, isFormValid, resetFields } from './formactions';

import { useHistory } from 'react-router';

import axios from 'axios'

import { countries } from './countries';

import {
    verifyPhone,
    confirmPin,
    auth,
    firstUpdate
} from '../../../../store/act/user_action';

import LoadingScreen from '../loading';
import LoginScreen from './loginscreen';
import VerifyScreen from './verifyscreen';
import FirstScreen from './firstscreen';
import WelcomeScreen from './welcome';

const LoginPage = () => {
    const authentication = useSelector(state => state.user.userData);

    const dispatch = useDispatch();
    const history = useHistory();

    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');

    const [dialcode, dialcodeHandler] = useState({
        "name": "Indonesia",
        "dialCode": "+62",
        "countryCode": "ID"
    });

    const size = useWindowSize();

    const [verifymode, verifymodeHandler] = useState(false);

    const [timeout, timeoutHandler] = useState(false);

    const [loadingscreen, loadingscreenHandler] = useState(false);

    const [token, tokenHandler] = useState('');
    const [requestid, requestidHandler] = useState('');

    useEffect(() => {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            if (data) {
                countries.forEach((country) => {
                    if (country.name.toLowerCase() === data.country_name) {
                        dialcodeHandler(country)
                    }
                })
            }

        }).catch((error) => {
            console.log(error);
        });
    }, [])

    const formstyle = {
        formcolour: '#111111',
        formbgcolour: '#ffffff',
        formbordercolour: '#dddddd',
        formiconcolour: '#878787',
        formheight: 50,
        formfontsize: 15
    }

    const [formdata, formdataHandler] = useState({
        phone: {
            element: 'input',
            title: 'Phone',
            value: '',
            config: {
                name: 'phoneInput',
                type: 'tel',
                placeholder: 'Enter your phone'
            },
            validation: {
                required: true,
                number: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });

    const [formdataverify, formdataverifyHandler] = useState({
        verify: {
            element: 'input',
            title: 'Verify',
            value: '',
            config: {
                name: 'verifyInput',
                type: 'text',
                placeholder: 'Enter pin'
            },
            validation: {
                required: true,
                number: true,
                maxLength: 4
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });

    const [formdatafirst, formdatafirstHandler] = useState({
        name: {
            element: 'input',
            title: 'Name',
            value: '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter your name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        email: {
            element: 'input',
            title: 'Email',
            value: '',
            config: {
                name: 'emailInput',
                type: 'text',
                placeholder: 'Enter your email'
            },
            validation: {
                required: true,
                email: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        nickname: {
            element: 'input',
            title: 'Nickname',
            value: '',
            config: {
                name: 'nicknameInput',
                type: 'text',
                placeholder: 'Enter nickname'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    })

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'phone');
        formErrorHandler(false);
        formdataHandler(newFormdata);
    }

    const verifyForm = (element) => {
        const newFormdata = update(element, formdataverify, 'verify');
        formErrorHandler(false);
        formdataverifyHandler(newFormdata);
    }

    const firstTimeForm = (element) => {
        const newFormdata = update(element, formdatafirst, 'first');
        formErrorHandler(false);
        formdatafirstHandler(newFormdata);
    }

    const changeCountryCode = (country) => {
        dialcodeHandler(country)
    }

    const resendMyPhoneNumber = () => {
        verifymodeHandler(false);
        timeoutHandler(false);
        formErrorHandler(false);
        errorMessageHandler('');
    }

    const submitMyPhoneNumber = (event) => {
        event.preventDefault();
        loadingscreenHandler(true);
        errorMessageHandler('');

        const newFormdata = {
            ...formdata
        }

        for (let key in newFormdata) {
            newFormdata[key].validationMessage = '';
        }

        formdataHandler(newFormdata);

        let dataToSubmit = generateData(formdata, 'phone');
        let formIsValid = isFormValid(formdata, 'phone');

        let phonenumber = dataToSubmit.phone.replace(/^0+/, '');

        let totalDataToSubmit = {
            phone: phonenumber,
            extension: dialcode
        }

        if (formIsValid) {
            dispatch(verifyPhone(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    let token = response.payload.tokendoc.token;
                    let requestid = response.payload.tokendoc.requestid;
                    const newFormData = resetFields(formdata, 'reset');
                    setTimeout(() => {
                        formdataHandler(newFormData)
                        tokenHandler(token);
                        requestidHandler(requestid);
                        verifymodeHandler(true);
                        loadingscreenHandler(false);
                        formErrorHandler(false);
                        formSuccessHandler(false);
                    }, 1000)
                } else {
                    formErrorHandler(true);
                    loadingscreenHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {
            formErrorHandler(true);
            loadingscreenHandler(false);
            errorMessageHandler('PLEASE TRY AGAIN!');
        }
    }

    const verifyMyPin = (event) => {
        event.preventDefault();
        loadingscreenHandler(true);
        errorMessageHandler('');

        const newFormdata = {
            ...formdataverify
        }

        for (let key in newFormdata) {
            newFormdata[key].validationMessage = '';
        }

        formdataverifyHandler(newFormdata);

        let dataToSubmit = generateData(formdataverify, 'verify');
        let formIsValid = isFormValid(formdataverify, 'verify');

        let totalDataToSubmit = {
            code: dataToSubmit.verify
        }

        if (formIsValid) {
            dispatch(confirmPin(totalDataToSubmit, token, requestid)).then(response => {
                if (response.payload.success) {
                    formSuccessHandler(true);
                    const newFormData = resetFields(formdataverify, 'verify');
                    setTimeout(async () => {
                        dispatch(auth()).then(getresponse => {
                            if (getresponse.payload.success) {
                                formdataverifyHandler(newFormData)
                                verifymodeHandler(false);
                                loadingscreenHandler(false);
                                formErrorHandler(false);
                                formSuccessHandler(false);
                            } else {
                                formErrorHandler(true);
                                loadingscreenHandler(false);
                                errorMessageHandler(getresponse.payload.message);
                            }
                        })
                    }, 1000)
                } else {
                    formErrorHandler(true);
                    loadingscreenHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {
            formErrorHandler(true);
            loadingscreenHandler(false);
            errorMessageHandler('PLEASE TRY AGAIN!')
        }
    }

    const updateProfile = (event) => {
        event.preventDefault();
        loadingscreenHandler(true);
        errorMessageHandler('');

        const newFormdata = {
            ...formdatafirst
        }

        for (let key in newFormdata) {
            newFormdata[key].validationMessage = '';
        }

        formdatafirstHandler(newFormdata);

        let dataToSubmit = generateData(formdatafirst, 'first');
        let formIsValid = isFormValid(formdatafirst, 'first');

        if (formIsValid) {
            dispatch(firstUpdate(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    formSuccessHandler(true);
                    const newFormData = resetFields(formdatafirst, 'first');
                    setTimeout(async () => {
                        dispatch(auth()).then(getresponse => {
                            if (getresponse.payload.success) {
                                formdatafirstHandler(newFormData)
                                loadingscreenHandler(false);
                                formErrorHandler(false);
                                formSuccessHandler(false);
                            } else {
                                formErrorHandler(true);
                                loadingscreenHandler(false);
                                errorMessageHandler(getresponse.payload.message);
                            }
                        })
                    }, 1000)
                } else {
                    formErrorHandler(true);
                    loadingscreenHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {
            formErrorHandler(true);
            loadingscreenHandler(false);
            errorMessageHandler('DATA INVALID, PLEASE TRY AGAIN!');
        }
    }

    const goToDashboard = (event) => {
        event.preventDefault();
        history.push('/')
    }

    return (
        <div className="loginWrapper">
            <div
                className="loginContainer"
                style={{
                    height: size.height
                }}
            >
                {
                    loadingscreen ?
                        <LoadingScreen />
                        :
                        <div className="loginCardWrapper">
                            <div className="loginCard">
                                <div className="loginTitle">
                                    {
                                        authentication && !authentication.isAuth ?
                                            verifymode ? 'VERIFY PAGE'
                                                : 'LOGIN PAGE'
                                            : authentication && authentication.isFirstTime ? 'PLEASE COMPLETE DATA'
                                                : 'WELCOME'
                                    }
                                </div>
                                {
                                    authentication && !authentication.isAuth ?
                                        verifymode ?
                                            <VerifyScreen
                                                formstyle={formstyle}
                                                formdataverify={formdataverify}
                                                verifyForm={verifyForm}
                                                verifyMyPin={verifyMyPin}
                                                formError={formError}
                                                formSuccess={formSuccess}
                                                timeout={timeout}
                                                errorMessage={errorMessage}
                                                resendMyPhoneNumber={resendMyPhoneNumber}
                                                timeoutHandler={timeoutHandler}
                                            />
                                            :
                                            <LoginScreen
                                                changeCountryCode={changeCountryCode}
                                                formstyle={formstyle}
                                                dialcode={dialcode}
                                                formdata={formdata}
                                                updateForm={updateForm}
                                                formError={formError}
                                                errorMessage={errorMessage}
                                                formSuccess={formSuccess}
                                                countries={countries}
                                                submitMyPhoneNumber={submitMyPhoneNumber}
                                            />
                                        : authentication && authentication.isFirstTime ?
                                            <FirstScreen
                                                formstyle={formstyle}
                                                formdatafirst={formdatafirst}
                                                firstTimeForm={firstTimeForm}
                                                formError={formError}
                                                formSuccess={formSuccess}
                                                errorMessage={errorMessage}
                                                updateProfile={updateProfile}
                                            />
                                            :
                                            <WelcomeScreen
                                                formstyle={formstyle}
                                                authentication={authentication}
                                                goToDashboard={goToDashboard}
                                            />
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default LoginPage;