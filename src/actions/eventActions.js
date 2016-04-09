
// import * as types from '../constants/ActionTypes';
import _ from 'underscore'
import 'isomorphic-fetch'

export const ADD_EVENT = 'ADD_EVENT'
export const GET_EVENT = 'GET_EVENT'


export function addEvent(params) {
    // let queryPararms = toQueryString(params)

    // fetch('http://localhost:3001/events', {"method": "post", "body": payload})
    // return {
    //     type: types.ADD_EVENT,
    //     monitoringType: type,
    //     identifier: identifier
    // }
}

function getEvent(event) {
  return {
    type: GET_EVENT,
    "event": event
  }
}

function requestEvent(event) {
  return {
    type: "REQUEST_EVENT",
    "event": event
  }
}

export function getEventById(id = 1) {
    // fetch('http://localhost:3001/events/'+id)
  // return dispatch =>
  //   fetch('http://localhost:3001/events/')
  //     .then(response => {
  //       console.log(response)
  //       // getEvent(response)
  //       // return {
  //       //   "type": "GET_EVENT",
  //       //   "event": event
  //       // }
  //     })
  //     .catch(err => { throw err; });
  //
  // return {
  //   "type": "REQUEST_EVENT"
  // }

  return function (dispatch) {
    dispatch(requestEvent())
    fetch('http://localhost:3001/events/'+id)
        .then(response => {
          console.log(response)
          dispatch(getEvent(response))
          // getEvent(response)
          // return {
          //   "type": "GET_EVENT",
          //   "event": event
          // }
        })
        .catch(err => { throw err; });
  }
}

function toQueryString(obj) {

    let objWithValue = {}
    _.map(obj,function(v,k){
      if (v.length || v  > 0)
        objWithValue[k] = v
    })
    return _.map(objWithValue,function(v,k){
        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }).join('&');
};
