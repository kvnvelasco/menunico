import swoosh from 'menunico/src/static/swoosh.png'
import demoCover from 'menunico/src/static/resto.png'
import sampleDish from 'menunico/src/static/dish.png'
import loadingRestaurant from 'menunico/src/static/loading.png'
import noPhoto from 'menunico/src/static/no-image-available.jpg'
// Cards
import diners from 'menunico/src/static/cards/DinersClub-dark.png'
import amex from 'menunico/src/static/cards/AmericanExpress-dark.png'
import cirrus from 'menunico/src/static/cards/Cirrus-dark.png'
import discover from 'menunico/src/static/cards/Discover-dark.png'
import masterCard from 'menunico/src/static/cards/MasterCard-dark.png'
import maestro from 'menunico/src/static/cards/Maestro-dark.png'
import visa from 'menunico/src/static/cards/Visa-dark.png'
import cash from 'menunico/src/static/cards/Cash-dark.png'
import sodexo from 'menunico/src/static/cards/Sodexo.png'
import ticketRestaurant from 'menunico/src/static/cards/Ticket-Restaurant.jpg'

// menu items
import faq from 'menunico/src/static/menu/faq.png'
import setting from 'menunico/src/static/menu/gear.png'
import heart from 'menunico/src/static/menu/heart.png'
import home from 'menunico/src/static/menu/home.png'
import logout from 'menunico/src/static/menu/logout.png'
import profile from 'menunico/src/static/menu/profile.png'

// Filters
import bio from 'menunico/src/static/bio.png'
import gluten from 'menunico/src/static/gluten-free.png'
import lactose from 'menunico/src/static/lactose-free.png'
import vegan from 'menunico/src/static/vegan.png'
import vegetarian from 'menunico/src/static/vegetarian.png'
import ecologic from 'menunico/src/static/ecologic.png'

const initialState = {
  swoosh,
  demoCover,
  sampleDish,
  loadingRestaurant,
  noPhoto,
  payment: {
    diners,
    amex,
    cirrus,
    discover,
    masterCard,
    visa,
    cash,
    maestro,
    sodexo,
    ticketRestaurant
  },
  menu: {
    faq,
    setting,
    heart,
    home,
    logout,
    profile
  },
   filters: {
     bio,
     gluten,
     lactose,
     vegan,
     vegetarian,
     ecologic
   }
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
