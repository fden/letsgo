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

    handleLoadMoreClick() {

    }


    render() {
        const {title, lat, lon, description, date} = this.state.event

        return (

          <div className="mdl-grid">

            <div className="mdl-cell mdl-cell--4-col sidebar">

              <div>
                <ShowMap lat={lat} lng={lon}/>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--8-col content">
              <h3>{title}</h3>
              <p>
                  {description}
              </p>
              <div>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                Attend
                </button>
              </div>
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
