import * as types from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case types.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id ? {...user, deleting: true } :
                    user
                )
            };
        case types.DELETE_SUCCESS:
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case types.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        const { deleting, ...userCopy } = user;
                        return {...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        case types.FETCH_USER:
            return {
                ...state,
                user: action.payload
            }
        case types.FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}