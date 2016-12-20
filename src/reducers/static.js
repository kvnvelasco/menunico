import swoosh from '../static/swoosh.png'
import demoCover from '../static/resto.png'
import diners from '../static/cards/DinersClub-dark@3x.png'
import amex from '../static/cards/AmericanExpress-dark@3x.png'
import cirrus from '../static/cards/Cirrus-dark@3x.png'
import discover from '../static/cards/Discover-dark@3x.png'
import masterCard from '../static/cards/MasterCard-dark@3x.png'
import visa from '../static/cards/Visa-dark@3x.png'
import cash from '../static/cards/Cash-dark@3x.png'

const initialState = {
  swoosh,
  demoCover,
  payment: {
    diners,
    amex,
    cirrus,
    discover,
    masterCard,
    visa,
    cash
  }
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
