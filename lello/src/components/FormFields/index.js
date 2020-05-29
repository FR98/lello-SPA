import React, { Fragment } from 'react';

export const RenderInput = ({ input, meta }) => (
    <Fragment>
        {
            meta.dirty && meta.error && (
                <strong className='error-text'>{ meta.error }</strong>
            )
        }
        <input { ...input } />
    </Fragment>
);