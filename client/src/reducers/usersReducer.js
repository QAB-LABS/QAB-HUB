import * as types from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case types.GETALL_REQUEST:
            return {
                loading: true
            };
        case types.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case types.GETALL_FAILURE:
            return {
                error: action.error
            };
        case types.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id ? {...user, deleting: true } :
                    user
                )
            };
        case types.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case types.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
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