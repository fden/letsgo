
// import * as types from '../constants/ActionTypes';
import _ from 'underscore'
import 'isomorphic-fetch'
import $ from 'jquery'
import { browserHistory } from 'react-router'

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

function loginUserAction(params) {
    return {
      type: "LOGIN_USER",
      user: params
    }
}

export function loginUser(params){

  return function (dispatch) {
    let url = 'http://localhost:3001/users?name='+params.name

    $.get(url, function (result) {
      if (result.length == 0) {
        $.ajax({
          type: "POST",
          url: 'http://localhost:3001/users',
          data: params
        }).done(function(response) {
            browserHistory.push('/home')
        })
      } else {
        dispatch(loginUserAction(result[0]))
        // window.location.href = "/home"
        browserHistory.push('/home')
      }
    }.bind(this));
  }


  return {
    type: "REQUEST_LOGIN"
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
