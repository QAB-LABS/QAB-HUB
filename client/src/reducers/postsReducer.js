import * as type from '../actions/types'

const initialState = {
    selected: null,
    all: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_POSTS:
            return { ...state, all: action.payload }
        case type.FETCH_POST:
            return { ...state, selected: action.payload }
        default:
            return state
    }
}