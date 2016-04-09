
// import * as types from '../constants/ActionTypes';
import _ from 'underscore'
import 'isomorphic-fetch'
import $ from 'jquery'

export const ADD_EVENT = 'ADD_EVENT'
export const GET_EVENT = 'GET_EVENT'


export function addEvent(params, router) {
    let url = 'http://localhost:3001/events'
    $.ajax({
      type: "POST",
      url: url,
      data: params
    }).done(function(response) {
        window.location.href = "/event/"+response.id
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

function getUsersAction(users) {
  return {
    "type": GET_USERS,
    "users": users
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

function getUser(params) {
  // return function (dispatch) {
    let url = 'http://localhost:3001/users'

    $.get(url, function (result) {
      console.log(result)
    }.bind(this));
  // }


}

export function loginUser(params){

  let url = 'http://localhost:3001/users'

  $.get(url, function (result) {
    console.log(result)
  }.bind(this));
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
