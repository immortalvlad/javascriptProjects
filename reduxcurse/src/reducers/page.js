import {
SET_YEAR,
        GET_PHOTOS_FAIL,
        GET_PHOTOS_REQUEST,
        GET_PHOTOS_SUCCESS
        } from '../constants/Page';

const initialState = {
    year: 2016,
    photos: [],
    fetching: false,
    error: ''
}

export default function page(state = initialState, action) {
    switch (action.type) {
        case SET_YEAR:
            return {...state, year: action.payload, error: ''}
        case GET_PHOTOS_REQUEST:
            return {...state, year: action.payload, fetching: true, error: ''}
        case GET_PHOTOS_SUCCESS:
            return {...state, photos: action.payload, fetching: false, error: ''}
        case GET_PHOTOS_FAIL:
            return {...state, error: action.payload.message, fetching: false}
        default:
            return state;
}
}