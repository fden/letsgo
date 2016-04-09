import React, { Component } from 'react';

export default class Box extends Component {

    render() {
        return (
            <div className="dash-box box-half">
                <div className="dash-box-title">
                    <p>{this.props.title}</p>
                </div>
                <div className="trends search-trends js-scrollable">
                    {this.props.children}
                </div>
            </div>
        );
    }
}