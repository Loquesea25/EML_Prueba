import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

function Alert({ message, variant }) {
    return (
        <BootstrapAlert variant={variant}>
            {message}
        </BootstrapAlert>
    );
}

export default Alert;
