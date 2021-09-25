import React from 'react';

const Formfield = ({
    formdata,
    change,
    id,
    myclass,
    maxLength,
    disabled = false
}) => {
    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className="errorLabel">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div className="formBlock">
                        <input
                            {...formdata.config}
                            value={formdata.value || ''}
                            onChange={(event) => change({ event, id })}
                            className={myclass}
                            maxLength={maxLength ? maxLength : 10000}
                            disabled={disabled}
                        />
                        {showError()}
                    </div>
                )
                break;
            default:
                return formTemplate = null;
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default Formfield;