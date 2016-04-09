import merge from 'lodash/merge';
import * as types from '../constants/ActionTypes';

const initialFormState = {
    query: ''
};

export default function events(state = initialFormState, action) {

    switch(action.type) {
        case 'GET_EVENT':
            return Object.assign({}, state, action.events)

        default:
            return state;
    }
}
