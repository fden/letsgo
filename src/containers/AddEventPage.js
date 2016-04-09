import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions/eventActions'
import zip from 'lodash/zip'



class AddEventPage extends Component {
    constructor(props) {
        super(props)
        //require("../styles/less/ppvDashboard.less");
    }

    componentWillReceiveProps(nextProps) {

    }

    handleLoadMoreClick() {

    }

    handleSubmit() {
      let params = {}

      params.eventTitle = this.refs.eventTitle.value
      params.eventDate = this.refs.eventDate.value
      params.eventDescription = this.refs.eventDescription.value

      this.props.addEvent(params)
    }


    render() {
        return (
          <div>


            <div className="card mdl-card mdl-shadow--2dp">

              <div className="card-header">
                <div className="mdl-card__title card-item-bg">
                  <h2 className="mdl-card__title-text">Add new event</h2>
                </div>

                <div className="mdl-card__supporting-text card-item-bg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris sagittis pellentesque lacus eleifend lacinia...
                </div>
              </div>

              <div className="mdl-textfield mdl-js-textfield form-item">
                <input className="mdl-textfield__input" type="text" ref="eventTitle" placeholder="Event title"/>

              </div>

              <div className="mdl-textfield mdl-js-textfield form-item">
                <input className="mdl-textfield__input" type="text" ref="eventDate" placeholder="Event date"/>

              </div>

              <div className="mdl-textfield mdl-js-textfield form-item">
                <textarea className="mdl-textfield__input" type="text" rows= "3" ref="eventDescription" placeholder="Event description"></textarea>

              </div>

              <div className="mdl-card__actions mdl-card--border">
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                  Add event
                </button>
              </div>



            </div>

          </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { addEvent } = ownProps.params

    return {
      addEvent
    }
}

export default connect(mapStateToProps, {
    addEvent
})(AddEventPage)
