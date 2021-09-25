import React from 'react';

const NoMatch = () => {
    return (
        <div className="row wFullscreen hFullscreen noMargin pt10p">
            <div className="lumi-md-12 lumi-xs-12">
                <div className="mxAuto myCard cardTransparent textCenter">
                    <h1 className="lh1 fs170 mb50">404</h1>
                    <h3 className="textUppercase">Page not found!</h3>
                    <p className="lead">Seems you're looking for something that doesn't exist. </p>
                </div>
            </div>
        </div>
    );
}

export default NoMatch;