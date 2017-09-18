import React, { Component } from 'react';
import Winner from './Winner';
import Vote from './Vote';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
//import {List, Map} from 'immutable';

export class Voting extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return <div>
            {this.props.winner ?
                            <Winner ref="winner" winner={this.props.winner} /> :
                            <Vote {...this.props} />}
        </div>;
    }
}
;

function mapStateToProps(state1) {
    return {
        pair: state1.getIn(['vote', 'pair']),
//    tally: state1.getIn(['vote', 'tally']) || Map(),
        hasVoted: state1.getIn(['myVote', 'entry']),
        winner: state1.get('winner')
    };
}

export const VotingContainer = connect(
        mapStateToProps,
        actionCreators
        )(Voting);