import * as actionTypes from './actions';

let initialState = {
    projects: [ { } ],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default reducer;