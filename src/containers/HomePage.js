import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getEventById } from '../actions/eventActions'
import zip from 'lodash/zip'
import ShowMap from '../components/showMap'
import $ from 'jquery'

class HomePage extends Component {
    constructor(props) {
        super(props)
        //require("../styles/less/ppvDashboard.less");
        this.state = {
          events: []
        }
    }

    componentWillMount() {
      // console.log(this.props.params.id)
        // this.props.getEventById(this.props.params.id)
    }

    componentDidMount(){
        let url = 'http://localhost:3001/events'

        this.serverRequest = $.get(url, function (result) {
          var result = result;
          this.setState({
            events: result
          });
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {

    }

    handleLoadMoreClick() {

    }


    render() {

        let events = this.state.events
        return (
          <div>
          {events.map(item =>
                  <div>item.title</div>
          )}
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
})(HomePage)
