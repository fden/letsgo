import merge from 'lodash/merge';
import * as types from '../constants/ActionTypes';

const initialFormState = {
    id: 0
};

export default function user(state = initialFormState, action) {

    switch(action.type) {
        case 'LOGIN_USER':
            return Object.assign({}, state, action.user)

        default:
            return state;
    }
}
