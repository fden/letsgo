import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions/eventActions'
import zip from 'lodash/zip'


function loadData(props) {

}

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        //require("../styles/less/ppvDashboard.less");
    }

    componentWillMount() {
        loadData(this.props)
    }

    componentWillReceiveProps(nextProps) {

    }

    handleLoadMoreClick() {

    }

    handleSubmit() {
      let params = {}

      params.title = this.refs.title.value
      params.date = this.refs.date.value
      params.description = this.refs.description.value

      this.props.addEvent(params)
    }


    render() {
        return (
          <div>
            <input type="text" ref="title" />
            <input type="text" ref="description" />
            <input type="text" ref="date" />
            <button onClick={this.handleSubmit.bind(this)}  />
          </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { addEvent } = ownProps.params
    const {
    entities: { }
    } = state
    return {
    }
}

export default connect(mapStateToProps, {
    addEvent
})(DashboardPage)
