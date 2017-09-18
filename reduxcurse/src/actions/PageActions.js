import {
SET_YEAR,
        GET_PHOTOS_REQUEST,
        GET_PHOTOS_SUCCESS
        } from '../constants/Page';

let photosArr = [];
let cached = false;

export function setYear(year) {
    return {
        type: SET_YEAR,
        payload: year
    }

}

function makeYearPhotos(photos, selectedYear) {
    let createdYear, yearPhotos = [];
    photos.forEach((item) => {
        createdYear = parseInt(item.created);
        if (createdYear === selectedYear) {
            yearPhotos.push(item)
        }
    })

    yearPhotos.sort((a, b) => b.likes.count - a.likes.count);

    return yearPhotos;
}


function getMorePhotos(offset, count, year, dispatch) {
    photosArr = [
        {
            created: '2015',
            src:'https://upload.wikimedia.org/wikipedia/commons/7/7b/MenloParkRoundTable.jpg',
            likes:{
                count:5
            }
        },
        {
            created: '2013',
            src:'http://cdn.homedsgn.com/wp-content/uploads/2013/10/Menlo-Park-Residence-01-800x450.jpg',
            likes:{
                count:3
            }
        },
        {
            created: '2013',
            src:'http://cdn.homedsgn.com/wp-content/uploads/2013/10/Menlo-Park-Residence-01-800x450.jpg',
            likes:{
                count:2
            }
        }
    ];
    let photos = makeYearPhotos(photosArr, year);
    cached = true
    dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: photos
    })
}

export function getPhotos(year) {

    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year
        })

        if (cached) {
            let photos = makeYearPhotos(photosArr, year);
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: photos
            })
        } else {
            getMorePhotos(0, 200, year, dispatch)
        }

    }
}

