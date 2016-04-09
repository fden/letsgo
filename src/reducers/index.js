
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import entities from './entities.js'
import events from './events.js'

const fetching = {
    recentSearches:false,
    userMonitoring:false,
    topAdvertisers:false,
    topSearches:false,
    monitoringDetails: false,
    search: false
}

// Updates an entity cache in response to any action with response.entities.
function isFetching(state = fetching, action) {
    const { type, isFetching } = action
    if (isFetching) {
        return merge({}, state, action.isFetching)
    }

    return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
    const { type, error } = action

    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return action.error
    }

    return state
}

const rootReducer = combineReducers({
    routing,
    isFetching,
    events
})

export default rootReducer
