import * as types from '../actions/types';

let initialState = {}

const filterLookup = {
    price: {
        '$': 'min_player<10',
        '$$': 'min_players>11&min_player<30',
        '$$$': 'min_players>31&min_player<60',
        '$$$$': 'min_players>61&min_player<100',
        '$$$$$': 'min_players>100',
    },
    
}

const createQueryString = (filters) => {
    for (let k in filters) {
        console.log(filters[k])
    }
    return ''
}

const visibilityFilter = (state = initialState, action) => {
    var filterKey, filterValue
    if (action.payload) {
        filterKey = action.payload.filterKey
        filterValue = action.payload.filterValue
    }

    switch (action.type) {

        case types.ADD_FILTER:
            if (!state[filterKey]) state[filterKey] = []
            const newFilters = [...state[filterKey], filterValue]
            return {...state, [filterKey]: newFilters }

        case types.REMOVE_FILTER:
            const newFilter = state[filterKey].filter(item => item !== filterValue)
            return {...state, [filterKey]: newFilter }

        case types.UPDATE_QUERY_URL:
            console.log('updatingggg')
            const query = createQueryString({...state })
            return {...state, query }

        default:
            return state
    }
}

export default visibilityFilter