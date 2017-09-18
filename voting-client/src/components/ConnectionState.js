import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export  class ConnectionState extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    isVisible() {
        return !this.props.connected;
    }
    getMessage() {
        return `Not connected (${this.props.state})`;
    }
    render() {
        return <div className="connectionState"
             style={{display: this.isVisible() ? 'block' : 'none'}} >
            {this.getMessage()}
        </div>
        }
    }
    export const ConnectionStateContainer = connect(
            state => state.get('connection', Map()).toJS()
    )(ConnectionState);