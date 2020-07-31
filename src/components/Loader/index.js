import React from 'react';
import { LoaderWrapper, Spin } from './styles';

function Loader() {
    return(
        <LoaderWrapper>
            <Spin />
        </LoaderWrapper>
    );
}

export default Loader;