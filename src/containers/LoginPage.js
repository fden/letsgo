import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/eventActions'
import zip from 'lodash/zip'
import MapAddMarker from '../components/map'


class LoginPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {

    }

    handleLoadMoreClick() {

    }

    handleSubmit() {
      let params = {}

      params.name = this.refs.name.value

      this.props.loginUser(params)
    }

    handleChangePosition(lat, lon) {
        this.setState({
          lat:lat,
          lon: lon
        })
    }


    render() {
        return (
          <div>
            <div className="card mdl-card mdl-shadow--2dp">
              <div className="mdl-textfield mdl-js-textfield form-item">
                <input className="mdl-textfield__input" type="text" ref="name" placeholder="Nickname"/>
              </div>
              <div className="mdl-card__actions mdl-card--border">
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.handleSubmit.bind(this)}>
                  Login
                </button>
              </div>
            </div>

          </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    const { loginUser } = ownProps.params

    return {
      loginUser
    }
}

export default connect(mapStateToProps, {
    loginUser
})(LoginPage)
