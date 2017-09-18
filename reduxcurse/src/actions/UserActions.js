import {
LOGIN_REQUEST,
        LOGIN_SUCCES
} from '../constants/User';

export function handleLogin() {

    return function (dispatch) {

        dispatch({
            type: LOGIN_REQUEST
        })


        let username = 'vlad';

        dispatch({
            type: LOGIN_SUCCES,
            payload: username
        })

    }

}