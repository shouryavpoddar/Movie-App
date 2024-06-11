import React, { Suspense } from 'react';

const withSuspense = (Component, Fallback = null) => {
    return (props) => (
        <Suspense fallback={Fallback || <div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
};

export default withSuspense;
