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
  }
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'LOAD_RESTAURANTS':
      return {...state, list: action.payload}
    case 'TOGGLE_FILTER':
      return {...state, filters: {
        ...state.filters,
        [action.payload.group]: {
          ...state.filters[action.payload.group],
          [action.payload.name]: action.payload.value
        }
      }}
    case 'SET_PRICE_FILTER':
      return {...state, filters: {
        ...state.filters,
        price: action.payload
      }}
    case 'SET_CURRENT_RESTAURANT':
      return {...state, selected: action.payload}
    case 'RESTAURANT_HIGHLIGHTED':
      return {...state, highlighted: action.payload.id}
    case 'RESTAURANT_CLEAR_HIGHLIGHTED':
      return {...state, highlighted: null}
    default:
      return state
  }
}
