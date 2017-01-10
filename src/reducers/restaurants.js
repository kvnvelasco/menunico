const initialState = {
  list: [],
  filters: {
    price: [0, 10],
    cuisine: {
      italian: true,
      french: true,
      chinese: true,
      mexican: true,
      japanese: true,
      spanish: true
    },
    payment: {
      cash: true,
      visa: true,
      masterCard: true,
      maestro: true,
      amex: true,
      ticketRestaurant: true,
      sodexo: true,
    }
  },
  defaultFilters: {
    price: [0, 10],
    cuisine: {
      italian: true,
      french: true,
      chinese: true,
      mexican: true,
      japanese: true,
      spanish: true
    },
    payment: {
      cash: true,
      visa: true,
      masterCard: true,
      maestro: true,
      amex: true,
      ticketRestaurant: true,
      sodexo: true,
    }
  },
  fetching: false
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'FETCHING_RESTAURANTS':
      return {...state, fetching: true}
    case 'LOAD_RESTAURANTS':
      return {...state, list: action.payload, fetching: false}
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
        item.mainid === action.payload.restaurant
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
