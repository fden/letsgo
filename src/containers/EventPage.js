import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getEventById } from '../actions/eventActions'
import zip from 'lodash/zip'
import { browserHistory } from 'react-router'
import ShowMap from '../components/showMap'
import $ from 'jquery'

class EventPage extends Component {
    constructor(props) {
        super(props)
        //require("../styles/less/ppvDashboard.less");
        this.state = {
          event: {},
          attenders: 5,
          attend: false
        }
    }

    componentWillMount() {
      // console.log(this.props.params.id)
        // this.props.getEventById(this.props.params.id)
    }

    componentDidMount(){
        let url = 'http://localhost:3001/events/'+this.props.params.id

        $.get(url, function (result) {
          console.log(result)
          this.setState({
            event: result
          });
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {

    }

    handleAttendClick() {
      if (this.props.user.id == 0) {
          browserHistory.push('/login')
      }
      let url = 'http://localhost:3001/events/'+this.props.params.id

      let eventObj = this.state.event

      eventObj.users.push(1);

      $.ajax({
        url: url,
        type: 'PUT',
        data: eventObj,
        success: function(result) {
            // Do something with the result
        }
    });

      this.serverRequest = $.put(url, event, function (result) {

      }.bind(this));
    }

    handleAttend() {
      if (this.props.user.id == 0) {
          browserHistory.push('/login')
      }

      this.setState({
        attenders: this.state.attenders + 1,
        attend: true
      })
    }


    render() {
        const {eventTitle, lat, lon, eventDescription, date} = this.state.event

        let attenders = []

        attenders.push(<img src="https://randomuser.me/api/portraits/men/1.jpg"/>)
        attenders.push(<img src="https://randomuser.me/api/portraits/men/2.jpg"/>)
        attenders.push(<img src="https://randomuser.me/api/portraits/men/3.jpg"/>)
        attenders.push(<img src="https://randomuser.me/api/portraits/men/4.jpg"/>)
        attenders.push(<img src="https://randomuser.me/api/portraits/men/5.jpg"/>)
        if (this.state.attend) {
          attenders.push(<img src="https://randomuser.me/api/portraits/men/6.jpg"/>)
        }

        return (
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col sidebar">
              <h4>Owner: Alex Szczepiorek</h4>
              <h5>Game level: Expert</h5>
              <h5>Location: Wroclaw, Krzynicka 17a</h5>
              <div>
                <ShowMap lat={lat} lng={lon}/>
              </div>
              <div className="attenders">
                  <h5>Attenders: {this.state.attenders}</h5>
              </div>
              <div className="attenders-pics">
                {attenders}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--8-col content">
              <h3>{eventTitle}</h3>
              <p>
                  {eventDescription}
              </p>
              <div>
              {
                !this.state.attend ? <button onClick={this.handleAttend.bind(this)} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                Attend
                </button> : ''
              }

              </div>
            </div>
          </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { getEventById } = ownProps.params
    return {
      user: state.user,
      getEventById
    }
}

export default connect(mapStateToProps, {
    getEventById
})(EventPage)
