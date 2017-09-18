'use strict';

export default function (message) {
    console.log(NODE_ENV);
    if (NODE_ENV == 'development') {
        console.log(message);
    }
    alert(`Welcome ${message}`);
};