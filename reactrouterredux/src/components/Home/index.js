import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { Prompt } from 'react-router';

export default class Home extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        const value = e.target.elements[0].value.toLowerCase()
        this.context.router.history.push(`/genre/${value}`)
    }
    componentDidMount() {

//        this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
    }
    routerWillLeave() {

//        let answer = window.confirm('Вы уверены?')
//        if (!answer)
//            return false
    }
    render() {
        function ss(){
            return 'Вы уверены?';
        }
        return (
                <div className='row'>
                    <div className='col-md-12'>Раздел /</div>
                    <form className='col-md-4' onSubmit={this.handleSubmit}>
                        <input type='text' placeholder='genreName'/>
                        <button type='submit'>Перейти</button>
                    </form>
                    <Prompt message={ss} when={true} />
                </div>
                )
    }
}

Home.contextTypes = {
    router: PropTypes.object.isRequired
}