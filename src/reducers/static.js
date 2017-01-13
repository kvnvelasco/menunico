import swoosh from '../static/swoosh.png'
import demoCover from '../static/resto.png'
import sampleDish from '../static/dish.png'
import loadingRestaurant from '../static/loading.png'
import noPhoto from '../static/no-image-available.jpg'
// Cards
import diners from '../static/cards/DinersClub-dark.png'
import amex from '../static/cards/AmericanExpress-dark.png'
import cirrus from '../static/cards/Cirrus-dark.png'
import discover from '../static/cards/Discover-dark.png'
import masterCard from '../static/cards/MasterCard-dark.png'
import maestro from '../static/cards/Maestro-dark.png'
import visa from '../static/cards/Visa-dark.png'
import cash from '../static/cards/Cash-dark.png'
import sodexo from '../static/cards/Sodexo.png'
import ticketRestaurant from '../static/cards/Ticket-Restaurant.jpg'

// menu items
import faq from '../static/menu/faq.png'
import setting from '../static/menu/gear.png'
import heart from '../static/menu/heart.png'
import home from '../static/menu/home.png'
import logout from '../static/menu/logout.png'
import profile from '../static/menu/profile.png'

// Filters
import bio from '../static/bio.png'
import gluten from '../static/gluten-free.png'
import lactose from '../static/lactose-free.png'
import vegan from '../static/vegan.png'
import vegetarian from '../static/vegetarian.png'
import ecologic from '../static/ecologic.png'

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
