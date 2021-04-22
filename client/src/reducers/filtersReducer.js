import * as types from '../actions/types'

let initialState = {}

const filterLookup = {
  price: {
    $: 'price<10',
    $$: 'price<30',
    $$$: 'price<60',
    $$$$: 'price<100',
    $$$$$: 'price<10000000',
  },
  'minimum players': {
    1: 'min_players=1',
    2: 'min_players=2',
    3: 'min_players=3',
    4: 'min_players=4',
    5: 'min_players=5',
    '6+': 'min players>=6',
  },
}

const createQueryString = (filters) => {
  var qString = '?'
  qString += Object.keys(filters)
    .map((k) => {
      if (k === 'categories')
        return filters[k].map((f) => 'category=' + f).join('&')

      if (!['query', 'newFilters'].includes(k)) {
        return filters[k].map((filter) => filterLookup[k][filter]).join('&')
      }
      return null
    })
    .filter((e) => e)
    .join('&')
  return qString.length === 1 ? '' : qString
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
      return { ...state, [filterKey]: newFilters }

    case types.REMOVE_FILTER:
      const newFilter = state[filterKey].filter((item) => item !== filterValue)
      return { ...state, [filterKey]: newFilter }

    case types.UPDATE_QUERY_URL:
      const query = createQueryString({ ...state })
      return { ...state, query }

    case types.FILTERS_APPLIED:
      return { ...state, newFilters: false }

    case types.FILTERS_UPDATED:
      return { ...state, newFilters: true }

    default:
      return state
  }
}

export default visibilityFilter
