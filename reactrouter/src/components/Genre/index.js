import React, { Component } from 'react'
        import {
//  BrowserRouter as Router,
//        Route,
//  Link,
//  Switch
        } from 'react-router-dom';
//import Release from '../components/Release';
export default class Genre extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.match.url;
    }
    render() {
           return (
                    <div className='row'>
                        <h3 className='col-md-12'>{this.props.match.params.genre}</h3>
                        <div className='col-md-12'>Здесь будет список релизов</div>
                    </div>
                    );
    }
}