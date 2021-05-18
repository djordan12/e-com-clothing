import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

// higher order component
// takes a component which gets passed into this new component below
const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        ) : (
            <WrappedComponent { ...otherProps } />
        );
    };
    return Spinner;
}

export default WithSpinner;