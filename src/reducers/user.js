import merge from 'lodash/merge';
import * as types from '../constants/ActionTypes';

const initialFormState = {
    user: {}
};

export default function user(state = initialFormState, action) {

    switch(action.type) {
        case 'GET_USER':
            return Object.assign({}, state, action.users)

        default:
            return state;
    }
}
