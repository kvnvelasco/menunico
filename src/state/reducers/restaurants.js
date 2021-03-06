const initialState = {
  list: [],
  filters: {
    price: [0, 10]
  },
  defaultFilters: {
    price: [0, 10],
    neighborhood: ''
  },
  fetching: false
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'FETCHING_RESTAURANTS':
      return {...state, fetching: true}
    case 'FETCH_RESTAURANTS_FAIL':
      return {...state, fetching: false}
    case 'LOAD_RESTAURANTS':
      return {...state, list: action.payload, fetching: false}
    case 'LOAD_MENUS':
      return {...state, menus: action.payload}
    case 'LOAD_DISHES':
      return {...state, dishes: action.payload}
    case 'LOAD_FILTERS':
      return {...state, defaultFilters: {...state.filters, ...action.payload}, filters: {...state.filters, ...action.payload}}
    case 'TOGGLE_FILTER':
      return {...state, filters: {
        ...state.filters,
        [action.payload.group]: {
          ...state.filters[action.payload.group],
          [action.payload.name]: action.payload.value
        }
      }}
    case 'RESET_FILTER':
      return {...state, filters: {
        ...state.filters,
        [action.payload]: state.defaultFilters[action.payload]
      }}
    case 'RESET_ALL_FILTERS':
      return {...state, filters: state.defaultFilters}
    case 'SET_PRICE_FILTER':
      return {...state, filters: {
        ...state.filters,
        price: action.payload
      }}
    case 'SELECT_NEIGHBORHOOD':
      return {...state, filters: {
        ...state.filters,
        neighborhood: action.payload
      }}
    case 'SET_CURRENT_RESTAURANT':
      return {...state, selected: action.payload}
    case 'RESTAURANT_HIGHLIGHTED':
      return {...state, highlighted: action.payload.id}
    case 'RESTAURANT_CLEAR_HIGHLIGHTED':
      return {...state, highlighted: null}
    case 'SELECT_DISH':
      const restaurant = state.list.find((item) => {
        return item.mainid === action.payload.restaurant
      })
      return {...state, selectedDish: {
        restaurant,
        dish: action.payload.dish,
        day: action.payload.day
      } }
    default:
      return state
  }
}
