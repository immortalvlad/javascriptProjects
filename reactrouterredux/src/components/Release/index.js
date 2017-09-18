import React, { Component } from 'react'

        export default class Release extends Component {
    render() {
//    const releaseName = 'some';
        const releaseName = this.props.match.params.relese;
        const ganreName = this.props.match.params.genre;
        return (
                <div className='row'>
                    <h3 className='col-md-12'>
                        {ganreName}
                    </h3>
                    <div className='col-md-12'>
                        {releaseName}
                    </div>
                </div>
                )
    }
}