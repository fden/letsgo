import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'
import { Router, Route, Link } from 'react-router'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, inputValue, user } = this.props

    let account = <Link to={'/login'}>login</Link>
    if (!user.id == 0) {
        account = <div className="material-icons mdl-badge mdl-badge--overlap" data-badge="3">account_box</div>
    }

    return (
      <div>
        <div className="main-container">
          <div className="header clearfix">
            <h1 className="logo">LETS GO!</h1>
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored go-button">
              <Link to={'/add'}><i className="material-icons">add</i></Link>
            </button>
            <nav className="mdl-navigation">
              <Link to="/home">Events</Link>
              <a className="mdl-navigation__link" href="">Locations</a>
              <a className="mdl-navigation__link" href="">News</a>
              <a className="mdl-navigation__link" href="">About</a>
              {account}
            </nav>
          </div>
          {children}
        </div>
        <footer className="mdl-mini-footer">
          <div className="mdl-mini-footer__left-section">
            <div className="mdl-logo">Lets go 2016 © All rights reserved</div>
            <ul className="mdl-mini-footer__link-list">
              <li><Link to="/home">Events</Link></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Privacy & Terms</a></li>
            </ul>
          </div>
        </footer>
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    user: state.user,
    inputValue: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
