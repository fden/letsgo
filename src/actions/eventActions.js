
// import * as types from '../constants/ActionTypes';
import _ from 'underscore'
import 'isomorphic-fetch'
import $ from 'jquery'

export const ADD_EVENT = 'ADD_EVENT'
export const GET_EVENT = 'GET_EVENT'


export function addEvent(params) {
    // let queryPararms = toQueryString(params)

    // fetch('http://localhost:3001/events', {"method": "post", "body": params})
    let url = 'http://localhost:3001/events'
    $.ajax({
      type: "POST",
      url: url,
      data: params
    })
    return {
        type: ADD_EVENT
    }
}

function getEvent(events) {
  return {
    "type": GET_EVENT,
    "event": events
  }
}

function requestEvent(event) {
  return {
    type: "REQUEST_EVENT",
    "event": event
  }
}

export function getEventById(id = 1) {

  return function (dispatch) {
    dispatch(requestEvent())
    fetch('http://localhost:3001/events/'+id)
        .then(response => {
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
