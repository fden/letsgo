import React, { Component } from 'react';


export default class Modal extends React.Component {
    constructor(props){
        super(props);
        this.state = { isVisible: props.visible };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isVisible: nextProps.visible
        })
    }

    show() {
        this.setState({isVisible: true});
    }

    hide() {
        this.setState({isVisible: false});
        if(this.props.onModalClose) {
            this.props.onModalClose();
        }
    }

    onOverlayClicked() {
        if(this.props.hideOnOverlayClicked) {
            this.hide();
        }
    }

    render() {
        var overlay;

        var dialogStyles = {}
        var overlayStyles = {}
        var closeButtonStyle = {}

        if (this.state.isVisible) {
            overlayStyles.display = 'block';
            dialogStyles.display = 'block';
            dialogStyles.left = '20%';
        } else {
            overlayStyles.display = 'none';
            dialogStyles.display = 'none';
        }

        if (this.props.showOverlay) {
            overlay = (<div className="dark-mask" onClick={() => this.onOverlayClicked()} style={overlayStyles}></div>);
        }

        return (
            <section className="">
                {overlay}
                <div style={dialogStyles} className="popup-content">
                    <a className="monitoring-close-icon" onClick={() => this.hide()} role="button" style={closeButtonStyle} ></a>
                    <h2>{this.props.title}</h2>
                    {this.props.children}
                </div>
            </section>
        )
    }
}

Modal.displayName = 'Modal';

Modal.propTypes = {
    closeButtonStyle: React.PropTypes.object,
    dialogStyles: React.PropTypes.object,
    hideOnOverlayClicked: React.PropTypes.bool,
    onOverlayClicked: React.PropTypes.func,
    overlayStyles: React.PropTypes.object,
    showOverlay: React.PropTypes.bool,
    title: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    visible: React.PropTypes.bool
};

Modal.defaultProps = {
    title: '',
    showOverlay: true,
    hideOnOverlayClicked: true,
    visible: false
};

export default Modal;