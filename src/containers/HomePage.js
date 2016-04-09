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
          <div className="mdl-grid content">
            <div className="mdl-cell mdl-cell--6-col">

              <ul className="main-list">
              {events.map(item =>
                <li className="">
                  <a href={'/event/'+item.id} className="main-list-link">
                    <span className="attenders-pics">
                      <img src={'https://randomuser.me/api/portraits/men/'+item.id+'.jpg'}/>
                      <span className="list-title">{item.title}</span>
                      
                      <p className="list-description">
                        {item.description}
                      </p>
                    </span>
                  </a>
                  <span className="mdl-list__item-secondary-content">
                    <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">star</i></a>
                  </span>
                </li>
              )}
              </ul>

            </div>

            <div className="mdl-cell mdl-cell--6-col">
              <div>
                MAP
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
})(HomePage)
