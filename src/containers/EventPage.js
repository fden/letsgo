import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getEventById } from '../actions/eventActions'
import zip from 'lodash/zip'
import ShowMap from '../components/showMap'
import $ from 'jquery'

class EventPage extends Component {
    constructor(props) {
        super(props)
        //require("../styles/less/ppvDashboard.less");
        this.state = {
          event: {}
        }
    }

    componentWillMount() {
      // console.log(this.props.params.id)
        // this.props.getEventById(this.props.params.id)
    }

    componentDidMount(){
        let url = 'http://localhost:3001/events/'+this.props.params.id

        this.serverRequest = $.get(url, function (result) {
          var result = result;
          this.setState({
            event: result
          });
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {

    }

    handleAttendClick() {
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


    render() {
        const {title, lat, lon, description, date} = this.state.event

        return (
          <div className="mdl-grid">
              <button onClick={this.handleAttendClick.bind(this)}>Attend</button>
            <div className="mdl-cell mdl-cell--4-col">
              <h3>{title}</h3>

              <div>
                <ShowMap lat={lat} lng={lon}/>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--8-col">
              <p>
                  {description}
              </p>
            </div>

          </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { getEventById } = ownProps.params
    return {
      getEventById
    }
}

export default connect(mapStateToProps, {
    getEventById
})(EventPage)
