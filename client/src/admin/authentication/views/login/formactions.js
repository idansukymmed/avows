export const validate = (element, formdata = []) => {
    let error = [true, ''];

    if (element.validation.email) {
        //eslint-disable-next-line
        const expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = expression.test(String(element.value).toLowerCase());
        const message = `${!valid ? 'EMAIL NOT VALID' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.number) {
        const expression = /^\d+$/;
        const valid = expression.test(String(element.value).toLowerCase());
        const message = `${!valid ? 'NUMBER ONLY' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'THIS FIELD IS REQUIRED' : ''}`
        error = !valid ? [valid, message] : error;
    }

    return error;
}

export const update = (element, formdata, formName) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newElement.touched = true;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

export const generateData = (formdata, formName) => {
    let dataToSubmit = {};

    for (let key in formdata) {
        dataToSubmit[key] = formdata[key].value;
    }

    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for (let key in formdata) {
        formIsValid = formdata[key].valid && formIsValid;
    }

    return formIsValid;
}

export const resetFields = (formdata, formName) => {
    const newFormdata = { ...formdata };

    for (let key in newFormdata) {
        newFormdata[key].value = '';
        newFormdata[key].valid = false;
        newFormdata[key].touched = false;
        newFormdata[key].validationMessage = '';
    }

    return newFormdata;
}

export const resetFieldsNoValid = (formdata, formName) => {
    const newFormdata = { ...formdata };

    for (let key in newFormdata) {
        newFormdata[key].value = '';
        newFormdata[key].validationMessage = '';
    }

    return newFormdata;
}