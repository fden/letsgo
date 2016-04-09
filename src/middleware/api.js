import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import config from '../../config'


// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const API_ROOT = config.api_endpoint;

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, isFetching) {
    isFetching[Object.keys(isFetching)[0]] = false;
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  return fetch(fullUrl, {credentials: 'same-origin', mode: 'cors'})
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      //const camelizedJson = camelizeKeys(json.data)
      //const nextPageUrl = getNextPageUrl(response)
      return Object.assign({},
          normalize(json.data, schema),
          {isFetching: isFetching}
      )
    })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

// DASHBOARD
const topAdvertisersSchema = new Schema('topAdvertisers', {
    idAttribute: 'name'
})

const monitoringItemsSchema = new Schema('monitoringItems', {
    idAttribute: generateMonitoring
})

const topSearchesSchema = new Schema('topSearches', {
    idAttribute: 'name'
})

const recentSearchesSchema = new Schema('recentSearches', {
    idAttribute: 'name'
})

//MONITORING
const userMonitoringSchema = new Schema('userMonitoring', {
  idAttribute: generateUserMonitoring
})
const userMonitoringDetailsSchema = new Schema('userMonitoringDetails', {
    idAttribute: generateUserMonitoringDetails
})

const searchResultsSchema = new Schema('searchResults', {
    idAttribute: generateUserMonitoring
})

function generateMonitoring(entity) {
    return entity.id;
}

function generateUserMonitoring(entity) {
    return entity.id;
}

function generateUserMonitoringDetails(entity) {
    return 'details'
}

export const Schemas = {
    TOP_ADVERTISERS: topAdvertisersSchema,
    TOP_ADVERTISERS_ARRAY: arrayOf(topAdvertisersSchema),
    MONITORING_ITEMS: monitoringItemsSchema,
    MONITORING_ITEMS_ARRAY: arrayOf(monitoringItemsSchema),
    TOP_SEARCHES: topSearchesSchema,
    TOP_SEARCHES_ARRAY: arrayOf(topSearchesSchema),
    USER_MONITORING_ARRAY: arrayOf(userMonitoringSchema),
    SEARCH_RESULTS_ARRAY: arrayOf(searchResultsSchema),
    RECENT_SEARCHES_ARRAY: arrayOf(recentSearchesSchema),
    USER_MONITORING_DETAILS_ARRAY: userMonitoringDetailsSchema
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, isFetching } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  next(actionWith({ type: requestType, isFetching}))

  return callApi(endpoint, schema, isFetching).then(
    response => next(actionWith({
        isFetching,
        response,
        type: successType
    })),
    error => next(actionWith({
        isFetching,
        type: failureType,
        error: error.message || 'Something bad happened'
    }))
  )
}
