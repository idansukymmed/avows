import React from 'react';
import { useWindowSize } from './windowsize';

const NoMatch = () => {
    const size = useWindowSize();

    return (
        <div className="row lumisoftnomatch"
            style={{
                height: size.height
            }}
        >
            <div className="lumi-md-12 lumi-xs-12">
                <div className="lumisoftnomatchwrapper">
                    <h1 className="lumisoftnomatchtitle">404</h1>
                    <h3 className="textUppercase">Page not found!</h3>
                    <p className="lead">Seems you're looking for something that doesn't exist. </p>
                </div>
            </div>
        </div>
    );
}

export default NoMatch;