import React, { Component } from 'react';
import {
//    Link, 
    Route,
//    Switch
} from 'react-router-dom';
import GenreC from '../../components/Genre';
import Release from '../../components/Release';

export default class Genre extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.match.url;
    }
    render() {

        return (
                <div className='container'>
                    <h1>Genre</h1>
                        <Route  path={`${this.url}/:genre`} component={GenreC} />
                        <Route  path={`${this.url}/:genre/:relese`} component={Release} />
                </div>
                )
    }
}