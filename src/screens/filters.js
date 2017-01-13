import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Navigator } from 'menunico/src/composites/navigation'
import { Text } from 'menunico/src/components/type'
import {Button, Dimensions, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {CheckBox, CheckImage} from 'menunico/src/components/interactive'
import Slider from '@ptomasroos/react-native-multi-slider'
import {filterRestaurants, selectNeighborhood} from 'menunico/src/actions/restaurants'

import Svg, {Path, Text as SvgText} from 'react-native-svg'

class Filters extends Component {
  constructor(){
    super()
    this.state = {
      loaded: false
    }
  }
  render() {
    return (
      <View background='white' margin={[60]} align='stretch'>
        <Navigator
          id='filters'
          dispatch={this.props.dispatch}
          data={this.props.navigator} >
          <Home filters={this.props.filters} key='home'/>
          <Cuisine defaultFilters={this.props.defaultFilters.origins}  filters={this.props.filters.origins || {}} key='origins'/>
          <Preferences key='types' prefs={this.props.prefs} filters={this.props.filters.types || {}} />
          <Neighborhood selected={this.props.filters.neighborhood} key='neighborhood' />
          <Payment key='paymentmethods'
            cards={this.props.cards}
            filters={this.props.filters.paymentmethods || {}} />
        </Navigator>
      </View>
    )
  }
}

export default connect( store => ({
  navigator: store.navigation.filters,
  filters: store.restaurants.filters || {},
  defaultFilters: store.restaurants.defaultFilters,
  cards: store.static.payment,
  prefs: store.static.filters
}))(Filters)


class Home extends Component {
  _navigateToFilter(filter){
    const navigator = {
      id: 'filters',
      route: {
        key: filter,
        extra: this._renderReset.call(this, filter)
      }
    }
    this.props.dispatch({type: 'NAVIGATE_PUSH', payload: navigator})
  }

  _reset(name) {
    this.props.dispatch({type: 'RESET_FILTER', payload: name})
  }

  _renderReset(item) {
    return <Text onPress={this._reset.bind(this,item)} color='#F2504B'>Reset All</Text>
  }

  _setPricePoint(point){
    this.props.dispatch({type: 'SET_PRICE_FILTER', payload: point})
  }

  _filter() {
    const filters = this.props.filters
    // Translate the filter object into something we can send to the backend
    const query = Object.keys(filters).reduce( (acc, filter) => {
      if(!filters[filter]) return acc
      const arrayOfFilters = Object.keys(filters[filter]).filter( item => filters[filter][item])
      if(!arrayOfFilters.length) return acc
      return {...acc, [filter]: arrayOfFilters}
    }, {})
    this.props.dispatch(filterRestaurants(query))
    this.props.navigator.pop()
  }
  render() {
    return <View align='stretch' justify='space-between'
      padding={[40,20,20,20]}>
      <View direction='row' flex={0}
        justify='space-between' align='center'>
        <View margin={[0,20]}>
          <Text>Cuisine</Text>
          <Text
            size={14}
            color='#aaa'>
            {Object.keys(this.props.filters.origins || {}).reduce((acc, item, index, arr) => {
            return acc + (this.props.filters.origins[item] ? `${item.charAt(0).toUpperCase() + item.slice(1)}  ` : '')
          }, '') || 'All Cuisines'}</Text>
        </View>

        <Button
          onPress={this._navigateToFilter.bind(this, 'origins')}
          title='Add' color='#F2504B'/>
      </View>
      <View direction='row' flex={0}
        justify='space-between' align='center'>
        <View margin={[0,20]}>
          <Text>Preferences</Text>
          <Text
            size={14}
            color='#aaa'>
            {Object.keys(this.props.filters.types || {}).reduce((acc, item, index, arr) => {
            return acc + (this.props.filters.types[item] ? `${item.charAt(0).toUpperCase() + item.slice(1)}  ` : '')
          }, '') || 'No Preferences Selected'}</Text>
        </View>
        <Button
          onPress={this._navigateToFilter.bind(this, 'types')}
          title='Add' color='#F2504B'/>
      </View>
      <View direction='row' flex={0}
        justify='space-between' align='center'>
        <View margin={[0,20]}>
          <Text>Neighborhood</Text>
          <Text
            size={14}
            color='#aaa'>
            {this.props.filters.neighborhood || 'No Neighborhood Selected'}</Text>
        </View>
        <Button
          onPress={this._navigateToFilter.bind(this, 'neighborhood')}
          title='Add' color='#F2504B'/>
      </View>
      <View direction='row' flex={0}
        justify='space-between' align='center'>
        <View margin={[0,20]}>
          <Text>Payment Methods</Text>
          <Text
            size={14}
            color='#aaa'>
            {Object.keys(this.props.filters.paymentmethods || {}).reduce((acc, item, index, arr) => {
            return acc + (this.props.filters.paymentmethods[item] ? `${item.charAt(0).toUpperCase() + item.slice(1)}  ` : '')
          }, '') || 'All Payment Methods'}</Text>
        </View>
        <Button
          onPress={this._navigateToFilter.bind(this, 'paymentmethods')}
          title='Add' color='#F2504B'/>
      </View>

      <View flex={0}
        justify='space-between'>
        <Text >{`Price Range (€${this.props.filters.price[0]*5} - €${this.props.filters.price[1]*5})`}</Text>
        <View flex={0} height={60} padding={[30,20,30,20]} align='center'>
          <Slider values={this.props.filters.price} sliderLength={280}
            selectedStyle={{
              backgroundColor: '#F2504B'
            }}
            markerStyle={{
              backgroundColor: '#F2504B',
              height: 25,
              width: 25,
              borderRadius: 30
            }}
            pressedMarkerStyle={{
              height: 30,
              width: 30,
            }}
            onValuesChange={this._setPricePoint.bind(this)}/>
        </View>
      </View>
      <Button
        onPress={this._filter.bind(this)}
        title='Explore Restaurants' color='#F2504B'/>
     </View>
  }
}

class Cuisine extends Component {
  filterSelector(name, value) {
    const payload = {
      group: 'origins',
      name,
      value: !value
    }
    this.props.dispatch({type:'TOGGLE_FILTER', payload})
  }


  _renderCusine(item, index) {
    return (
      <View margin={[0,0,30]} key={index} direction='row' flex={0}
        justify='space-between' align='center'>
        <Text>{item}</Text>
        <CheckBox
          checked={this.props.filters[item]}
          handler={this.filterSelector.bind(this, item, this.props.filters[item])} />
      </View>
    )
  }
  render() {
    return (
      <View align='stretch' background='white' padding={[20,20,20,20]}>
        <Text
          align='center'
          size={24}
          color='#F2504B'>Choose your Origin Cuisine</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.keys(this.props.defaultFilters).map(this._renderCusine.bind(this))}
        </ScrollView>
        <Button
          onPress={e => this.props.navigator.pop()}
          color='#F2504B'
          title='Save Filters'/>
      </View>
    )
  }
}

class Preferences extends Component {
  filterSelector(name, value) {
    const payload = {
      group: 'types',
      name,
      value: !value
    }
    this.props.dispatch({type:'TOGGLE_FILTER', payload})
  }

  render() {
    return (
      <View align='stretch' padding={[20,20,20,20]} background='white'>
        <Text
          align='center'
          size={24}
          color='#F2504B'>Choose your preferences</Text>
        <View align='stretch' justify='space-between' padding={[20,0,60]}>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Vegetarian</Text>
            <CheckImage
              height={30}
              width={30}
              resize='cover'
              image={this.props.prefs.vegetarian}
              checked={this.props.filters['Vegetarian']}
              handler={this.filterSelector.bind(this, 'Vegetarian', this.props.filters['Vegetarian'])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Bio</Text>
            <CheckImage
              height={30}
              width={30}
              resize='cover'
              image={this.props.prefs.bio}
              checked={this.props.filters['Bio']}
              handler={this.filterSelector.bind(this, 'Bio', this.props.filters['Bio'])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Lactose Free</Text>
            <CheckImage
              height={30}
              width={30}
              resize='cover'
              image={this.props.prefs.lactose}
              checked={this.props.filters['Lactose free']}
              handler={this.filterSelector.bind(this, 'Lactose free', this.props.filters['Lactose free'])} />
          </View>
          {/* <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Ecologic</Text>
            <CheckImage
              height={30}
              width={30}
              resize='cover'
              image={this.props.prefs.ecologic}
              checked={this.props.filters.ecologic}
              handler={this.filterSelector.bind(this, 'ecologic', this.props.filters.ecologic)} />
          </View> */}
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Vegan</Text>
            <CheckImage
              height={30}
              width={30}
              resize='cover'
              image={this.props.prefs.vegan}
              checked={this.props.filters['Vegan']}
              handler={this.filterSelector.bind(this, 'Vegan', this.props.filters['Vegan'])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Gluten Free</Text>
            <CheckImage
              height={30}
              width={30}
              resize='cover'
              image={this.props.prefs.gluten}
              checked={this.props.filters['Gluten free']}
              handler={this.filterSelector.bind(this, 'Gluten free', this.props.filters['Gluten free'])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Other</Text>
            <CheckImage
              height={30}
              width={30}
              resize='cover'
              image={this.props.prefs.other}
              checked={this.props.filters['Other']}
              handler={this.filterSelector.bind(this, 'Other', this.props.filters['Other'])} />
          </View>
        </View>
        <Button
          onPress={e => this.props.navigator.pop()}
          color='#F2504B'
          title='Save Filters'/>
      </View>
    )
  }
}

class Payment extends Component {
  filterSelector(name, value) {
    const payload = {
      group: 'paymentmethods',
      name,
      value: !value
    }
    this.props.dispatch({type:'TOGGLE_FILTER', payload})
  }


  render() {
    return (
      <View align='stretch' padding={[20,20,20,20]} background='white'>
        <Text
          align='center'
          size={24}
          color='#F2504B'>Choose your Payment Methods</Text>
        <View align='stretch' justify='space-between' padding={[20,0,60]}>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Cash</Text>
            <CheckImage
              image={this.props.cards.cash}
              checked={this.props.filters['Cash']}
              handler={this.filterSelector.bind(this, 'Cash', this.props.filters['Cash'])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Visa</Text>
            <CheckImage
              image={this.props.cards.visa}
              checked={this.props.filters['Visa Mastercard']}
              handler={this.filterSelector.bind(this, 'Visa Mastercard', this.props.filters['Visa Mastercard'])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Master Card</Text>
            <CheckImage
              image={this.props.cards.masterCard}
              checked={this.props.filters["Visa Mastercard"]}
              handler={this.filterSelector.bind(this, "Visa Mastercard", this.props.filters["Visa Mastercard"])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Maestro</Text>
            <CheckImage
              image={this.props.cards.maestro}
              checked={this.props.filters["Maestro"]}
              handler={this.filterSelector.bind(this, "Maestro", this.props.filters["Maestro"])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>American Express</Text>
            <CheckImage
              image={this.props.cards.amex}
              checked={this.props.filters["American Express"]}
              handler={this.filterSelector.bind(this, "American Express", this.props.filters["American Express"])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Ticket Restaurant</Text>
            <CheckImage
              image={this.props.cards.ticketRestaurant}
              checked={this.props.filters["Ticket Restaurant"]}
              handler={this.filterSelector.bind(this, "Ticket Restaurant", this.props.filters["Ticket Restaurant"])} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Sodexo</Text>
            <CheckImage
              image={this.props.cards.sodexo}
              checked={this.props.filters["Sodaxo"]}
              handler={this.filterSelector.bind(this, "Sodaxo", this.props.filters["Sodaxo"])} />
          </View>
        </View>
        <Button
          onPress={e => this.props.navigator.pop()}
          color='#F2504B'
          title='Save Filters'/>
      </View>
    )
  }
}

class Neighborhood extends Component {

  _pickNeighborhood(name) {
    this.props.dispatch(selectNeighborhood(name))
  }

  _checkFill(name) {
    if(this.props.selected === name )
      return '#F2504B'
    return '#808285'
  }
  render() {
    const { width, height } = Dimensions.get('window')
    const svgWidth  = width - 40
    const svgHeight = svgWidth * 0.9
    return(
      <View align='stretch' padding={[20,20,20,20]} background='white'>
        <Text align='center' size={20} color='#F2504B'>Choose Your Neighborhood</Text>
        <View justify='center'>
          <Svg height={`${svgHeight}`} width={`${svgWidth}`} viewBox={`0 0 ${svgWidth +  30} ${svgHeight + 30}`}>
            <Path fill={this._checkFill('Sarria - St. Gervasi')} onPress={this._pickNeighborhood.bind(this, 'Sarria - St. Gervasi')} d="M184.528659,186.413128 C182.295251,187.443855 157.816257,172.538045 157.816257,172.538045 C157.816257,172.538045 149.286369,159.856592 145.367598,156.458715 C141.903855,153.455028 133.048659,152.698324 130.19581,148.677989 C129.595475,147.831788 129.559274,144.011061 129.936369,142.843073 C130.331061,141.621788 134.553017,140.765531 134.604804,139.342123 C134.734525,135.743631 134.042682,131.367318 133.78324,128.967989 C133.70933,128.283687 133.993911,126.162402 133.308101,126.11514 C129.547709,125.855698 127.884972,126.645587 127.084022,125.466536 C125.981899,123.845531 128.629609,121.31095 128.899106,120.21486 C129.817709,116.482626 126.809497,108.35648 128.380726,104.848492 C128.799553,103.913296 130.660391,103.425587 131.168715,102.709106 C132.369888,101.014693 131.364804,96.343743 132.270838,94.4748603 C132.57352,93.8503911 134.124134,93.3873184 134.475587,92.7889944 C135.263464,91.4475419 135.33838,87.8596089 134.475587,86.5649162 C132.314581,83.322905 129.891117,85.0927374 128.423966,84.4471508 C126.262961,83.4958659 122.009832,77.7564804 120.643743,75.0237989 C119.720615,73.1770391 119.505419,68.5126257 117.877374,67.2435754 C115.060726,65.0483799 103.699609,67.3295531 103.699609,67.3295531 C103.699609,67.3295531 97.4654749,69.915419 95.5734637,69.0586592 C90.9920112,66.9841341 87.7178212,60.8430168 88.0526816,57.388324 C88.8305028,49.3486592 96.6107263,47.7930168 99.8959777,48.2249162 C102.669888,48.5899441 107.572626,52.4795531 110.356089,52.2015084 C113.814302,51.8555866 124.187933,44.5077654 124.187933,42.0873184 C124.187933,39.4924022 124.52933,30.8081564 125.138715,30.6759218 C127.127263,30.2440223 132.525754,35.2156425 134.993966,33.0098883 C139.057542,29.3792179 127.038771,25.034581 127.559665,22.0313966 C128.095642,18.9407263 138.838324,20.5230168 138.71162,19.1785475 C137.155475,2.66681564 141.391508,0.592290503 143.725475,0.505810056 C145.172514,0.452513966 148.670447,0.26396648 150.122514,0.505810056 C151.159777,0.67877095 141.477486,11.8302235 149.776592,21.3400559 C150.715307,22.4160335 155.041844,22.546257 155.136369,25.0572067 C155.30933,29.639162 152.473073,29.3309497 152.542961,30.9358659 C152.715922,34.9124581 155.91419,38.3706704 158.421117,38.5431285 C163.739162,38.9096648 169.313631,38.6296089 173.895084,39.2344693 C175.522626,39.4496648 175.556313,44.2000559 174.932346,45.7184916 C174.582402,46.5707263 173.028771,47.9956425 173.030782,48.9167598 C173.032291,49.8338547 174.79257,50.4950279 175.191788,51.1647486 C176.356257,53.117095 174.439106,58.3597207 176.056592,59.8092737 C178.56352,62.0567598 187.554469,68.7987151 190.147877,71.3926257 C191.284693,72.5294413 190.233855,79.9521788 190.233855,79.9521788 L193.605587,84.1017318 C193.605587,84.1017318 184.269218,92.5737989 184.787598,100.872905 C185.263743,108.489721 194.383408,111.074078 194.383408,111.074078 L196.717877,118.335419 C196.717877,118.335419 191.732179,134.094972 193.692067,138.910726 C194.498547,140.892235 199.406816,143.269441 199.829665,144.875363 C200.413408,147.090168 196.027039,153.160391 195.712793,156.621117 C195.421173,159.83095 196.49162,159.735922 196.653017,160.99743 C196.977318,163.525978 188.15933,172.797989 188.15933,172.797989 C188.15933,172.797989 186.214022,185.634804 184.528659,186.413128 Z" id="Shape"   ></Path>
            <SvgText id="Sarria---St.-Gervasi" x="140.255859" y="130"  fontSize="11" font-weight="normal" fill="#FFFFFF">
                Sarria
            </SvgText>
            <SvgText id="Sarria---St.-Gervasi" x="138.255859" y="140"  fontSize="11" font-weight="normal" fill="#FFFFFF">
                - St. Gervasi
            </SvgText>
            <Path fill={this._checkFill( 'Les Corts')} onPress={this._pickNeighborhood.bind(this, 'Les Corts')} d="M161.603799,177.292961 C162.165419,180.676257 154.885475,182.989609 152.547989,185.742905 C150.743464,187.868715 148.463296,188.854693 140.856034,186.888268 C129.287765,183.897151 121.340112,178.372961 106.773184,177.702737 C105.609218,177.649441 107.362961,173.821676 106.643464,172.905084 C105.817374,171.852235 102.711117,172.266034 101.435028,171.67324 C97.6067598,169.892849 91.1740223,163.286145 90.0236313,159.224581 C89.4001676,157.022346 91.7527374,150.233631 91.7527374,150.233631 C91.7527374,150.233631 85.441676,144.960335 86.9118436,139.514078 C88.1507263,134.923575 96.2049721,136.27257 96.9400559,135.019106 C97.992905,133.223128 97.2150838,128.759832 97.6313966,126.72 C98.4665363,122.625754 102.442123,116.345363 105.325642,113.321564 C107.754637,110.773911 113.718268,107.961285 117.082458,106.924022 C118.984525,106.337765 122.906816,105.375922 124.257821,106.837542 C127.604413,110.458156 122.121955,122.758994 124.689721,127.066425 C125.396648,128.252011 129.208324,126.606872 130.244078,127.519441 C132.089832,129.145475 132.394022,137.329944 131.692123,138.909721 C130.65486,141.243687 126.678268,140.724804 127.02419,146.429497 C127.507374,154.402291 139.506034,154.602905 144.054302,158.013855 C147.512011,160.607263 151.580112,170.664134 155.119777,173.920726 C156.741285,175.412514 161.286536,175.383352 161.603799,177.292961 Z" id="Shape"   ></Path>
            <Path fill={this._checkFill( 'Sants Montjuic')}               onPress={this._pickNeighborhood.bind(this, 'Sants Montjuic')} d="M102.20581,182.629106 C111.073073,177.30905 135.920615,190.236872 144.392682,190.928212 C146.771397,191.122291 137.212291,194.94 137.303799,197.325251 C137.649721,206.316201 135.94324,215.701844 139.897207,219.456704 C160.471508,238.99324 157.428603,236.861397 172.747709,255.246536 C173.612011,256.283799 160.385531,270.029162 160.385531,270.029162 C160.385531,270.029162 164.73419,274.081676 164.275642,275.820838 C163.23838,279.754693 159.088827,277.204525 159.088827,277.204525 L155.631117,268.905419 L146.640168,271.671285 C146.640168,271.671285 150.271341,277.291006 149.752458,281.007654 C149.525196,282.636704 144.695363,282.996201 143.182458,281.353575 C141.861117,279.918603 141.453352,273.74581 141.453352,273.74581 L136.611955,274.783073 L136.266034,284.422626 L115.258827,290.128324 C115.258827,290.128324 114.66905,279.75067 112.060559,278.933128 C110.078547,278.311676 105.404078,283.904246 105.404078,283.904246 C105.404078,283.904246 92.3073184,284.422626 85.7800559,280.316313 C83.8317318,279.090503 94.6136313,275.026425 90.9668715,272.708547 C84.9152514,268.862179 73.6335754,285.20095 69.4840223,287.275475 C67.9972626,288.019106 65.3777095,282.045419 65.3777095,282.045419 C65.3777095,282.045419 60.6755866,280.939777 59.8449721,282.045419 C58.7639665,283.483911 61.5117318,287.800391 60.407095,289.220782 C59.5141341,290.368659 55.559162,290.053911 55.0040782,291.381788 C54.3564804,292.930391 56.3867598,297.951788 56.3867598,297.951788 C56.3867598,297.951788 80.2468156,288.961341 88.2,287.232235 C97.4463687,285.221564 100.454078,296.948212 97.8822905,300.026313 C92.1765922,306.856257 66.5014525,316.711508 66.5014525,316.711508 L58.8072067,309.363184 C58.8072067,309.363184 46.272067,317.489832 44.2840223,316.279106 C36.1171508,311.306983 8.4077095,280.143855 8.4077095,280.143855 C8.4077095,280.143855 2.81865922,267.343743 1.40530726,263.372682 C-2.22586592,253.172011 4.12843575,238.129944 4.12843575,238.129944 L4.77703911,221.402011 C4.77703911,221.402011 52.7470391,241.776201 69.0948603,246.601508 C70.5338547,247.026872 74.9735196,247.812235 74.9735196,247.812235 C74.9735196,247.812235 74.8005587,236.746257 81.9759218,227.75581 C89.216648,218.682905 97.5584916,223.217598 97.1909497,221.531229 C95.3567598,213.115978 103.069609,201.474804 103.069609,201.474804 C103.069609,201.474804 99.8281006,184.055028 102.20581,182.629106 Z" id="Shape"   ></Path>
            <Path fill={this._checkFill( 'Ciutat Vella')} onPress={this._pickNeighborhood.bind(this,'Ciutat Vella')} d="M98.2724581,320.601117 C95.9379888,318.007709 112.092235,310.241564 116.037654,306.07743 C117.513855,304.519274 119.020223,299.204749 119.020223,299.204749 C119.020223,299.204749 121.412514,298.575754 122.089274,298.124749 C123.057151,297.479162 124.751564,295.257821 125.892905,294.666536 C127.217765,293.980223 132.305531,294.507151 133.93257,293.629274 C134.652067,293.241117 135.016592,292.108324 135.618436,291.554749 C136.605419,290.645196 138.816704,290.648715 140.07067,290.171061 C147.677933,287.274972 161.812458,283.125419 169.808883,282.21838 C172.80905,281.877989 179.868771,281.673855 182.300782,279.883911 C212.255196,257.839441 196.305587,254.59743 196.305587,254.59743 C196.305587,254.59743 195.073743,265.854972 185.380391,264.031341 C182.106201,263.415419 196.95419,257.91486 193.841397,254.338492 C191.417933,251.553017 181.327877,256.381341 179.512793,259.525307 C177.962179,262.211229 182.929777,271.582793 179.837095,271.358045 C172.251453,270.80648 175.424078,261.034693 176.897765,257.839441 C179.599777,251.982402 168.25324,246.233966 166.178212,241.846592 C165.165084,239.703687 166.35067,232.42324 166.35067,232.42324 C166.35067,232.42324 176.724804,221.919385 179.966313,221.271285 C182.480782,220.768492 186.838994,228.143966 186.838994,228.143966 C186.838994,228.143966 194.334637,226.785922 196.823464,227.106704 C200.567765,227.588883 207.715978,231.77514 213.681117,233.201564 C215.388101,233.609832 214.122067,238.442179 214.71838,240.074246 C215.012011,240.878212 221.072179,240.592626 221.072179,240.592626 L221.33162,258.876704 C221.33162,258.876704 226.147374,259.428771 226.777877,260.56257 C227.510447,261.879385 225.521397,264.822235 224.443911,265.749385 C222.253743,267.633855 217.201173,270.725028 214.416201,271.497821 C211.406983,272.332961 206.030112,271.455084 206.030112,271.455084 L187.357374,283.125419 L186.708771,287.923575 C186.708771,287.923575 158.512123,297.624469 158.051061,296.395642 C157.402458,294.667039 180.873855,287.794358 179.577151,286.367933 C176.139553,282.586425 136.611955,296.050223 136.611955,296.050223 C136.611955,296.050223 101.891564,324.622961 98.2724581,320.601117 Z" id="Shape"   ></Path>
            <Path fill={this._checkFill( 'Exiample')} onPress={this._pickNeighborhood.bind(this, 'Exiample')} d="M163.75676,239.341173 C163.75676,239.341173 146.679888,224.159832 144.132737,217.209218 C142.703799,213.30905 143.441397,198.36352 143.441397,198.36352 L167.38743,181.591341 C167.38743,181.591341 186.12,191.649218 190.901564,194.040503 C193.668436,195.424693 211.389888,194.731844 211.389888,194.731844 C211.389888,194.731844 213.242682,197.921564 214.329218,197.930112 C225.568156,198.016592 225.221732,196.719888 225.221732,196.719888 L225.653631,187.988883 L241.560503,188.075363 L240.782682,215.609832 L229.371285,232.769665 C229.371285,232.769665 216.231285,233.290056 207.326816,229.054525 C203.782626,227.368659 204.080782,230.00581 197.817989,224.731508 C195.992346,223.193966 190.59486,227.289218 188.48162,226.720056 C186.233128,226.114693 183.412458,219.944413 180.786872,219.977095 C175.841899,220.038436 164.362123,230.783128 164.362123,230.783128 L163.75676,239.341173 Z" id="Shape"   ></Path>
            <SvgText id="Sant-Marti" x="245.826172" y="241"  fontSize="12" font-weight="normal" fill="#FFFFFF">
                Sant Marti
            </SvgText>
            <Path fill={this._checkFill( 'Gracia')} onPress={this._pickNeighborhood.bind(this, 'Gracia')} d="M223.147207,193.52162 L214.069777,193.262179 L210.698547,190.408827 C210.698547,190.408827 193.974637,191.161508 190.210223,190.408827 C186.320112,189.631508 189.431899,179.516816 189.431899,179.516816 L191.420447,172.860335 C191.420447,172.860335 199.992067,164.406369 200.064972,160.671117 C200.088101,159.484525 198.056313,157.698603 197.903966,156.521564 C197.55352,153.817039 202.362235,149.720279 202.65838,147.098715 C202.993743,144.128715 197.332793,141.193911 196.607263,138.712123 C193.927374,129.549218 198.627486,126.330335 199.286648,122.201397 C199.613966,120.152514 198.100056,115.567542 199.11419,113.81581 C199.750726,112.715698 202.191788,112.215419 203.17676,112.605587 C204.455866,113.111397 205.69324,115.134134 207.066872,115.069274 C208.522458,115.000894 208.852291,111.543184 210.178659,111.568324 C211.286313,111.589441 212.282849,115.262346 211.734804,116.409721 C211.265196,117.39419 207.547039,117.405754 207.196592,118.441508 C206.462514,120.609553 209.79,124.665587 214.198994,125.962291 C215.958268,126.479665 215.625419,130.501006 215.625419,130.501006 C215.625419,130.501006 224.702849,134.597765 224.702849,137.243464 C224.702849,140.226536 218.997151,144.246369 218.997151,144.246369 L218.997151,153.323296 C218.997151,153.323296 226.058883,154.119721 225.740112,156.435084 C224.314693,166.808715 223.147207,193.52162 223.147207,193.52162 Z" id="Shape"   ></Path>
            <Path fill={this._checkFill( 'Horta - Guinardo')} onPress={this._pickNeighborhood.bind(this, 'Horta - Guinardo')} d="M238.205363,67.7710056 C240.034525,65.4073743 250.135642,66.9931844 250.135642,66.9931844 L265.177709,78.1451397 L268.808883,86.9631285 L276.070223,89.8159777 L280.738156,89.297095 L289.296704,93.1872067 L276.847542,97.0773184 L275.810279,108.488212 L272.95743,116.009497 L272.95743,123.011899 C272.95743,123.011899 269.849665,126.563128 268.547933,127.420894 C266.932961,128.48581 262.807542,129.714134 261.935196,131.440726 C261.060838,133.170838 262.511397,137.912179 261.156872,139.156592 C260.026089,140.194358 255.446145,139.175698 255.127374,140.323073 C254.491844,142.60676 259.911453,145.29067 261.221732,147.584916 C262.614469,150.023464 263.886536,155.573799 265.371285,158.023911 C266.586034,160.027542 269.326257,163.210223 266.214469,167.359777 C264.73324,169.335251 265.500503,174.21486 264.398883,176.177765 C263.096648,178.498156 256.618659,183.439106 256.618659,183.439106 L226.188603,183.525587 C226.188603,183.525587 226.621006,166.064078 228.523073,153.268994 C228.759385,151.676648 221.953575,151.107486 221.953575,151.107486 C221.953575,151.107486 220.102291,144.110615 221.607654,142.980838 C222.644916,142.202514 225.481173,140.597095 226.275587,139.350168 C227.182123,137.928771 227.576816,133.679162 226.275587,132.607207 C224.806425,131.39648 218.188659,129.55676 216.939721,127.16095 C216.427374,126.178492 217.230838,123.590615 216.507821,122.751955 C215.396145,121.463296 210.189721,121.238547 210.456201,119.640168 C210.802123,117.56514 217.458603,115.490615 214.605754,107.709888 C214.267877,106.788268 211.595531,106.797821 210.715642,107.191006 C209.490335,107.73905 209.031788,111.327989 207.474134,111.470279 C205.865698,111.617598 203.330112,108.423352 202.157598,108.357989 C200.693464,108.276536 197.801397,110.08257 196.58162,110.173575 C194.568436,110.323408 191.788492,108.084972 190.48676,106.542905 C188.628939,104.342179 187.285978,97.8410615 188.152793,95.2612291 C189.170447,92.2313966 197.878324,86.9621229 197.878324,86.9621229 C197.878324,86.9621229 223.551955,86.7026816 238.205363,67.7710056 Z" id="Shape"   ></Path>
            <SvgText id="Horta---Guinardo" x="220.759766" y="100"  fontSize="12" font-weight="normal" fill="#FFFFFF">
                Horta -
            </SvgText>
            <SvgText id="Horta---Guinardo" x="220.759766" y="110"  fontSize="12" font-weight="normal" fill="#FFFFFF">
                Guinardo
            </SvgText>
            <Path fill={this._checkFill( 'Sant Marti')} onPress={this._pickNeighborhood.bind(this, 'Sant Marti')} d="M225.654637,272.276145 C225.654637,272.276145 233.447933,269.933631 234.818045,267.78067 C235.433464,266.814302 235.791453,263.925251 234.905028,263.199721 C233.967318,262.431955 230.063631,263.459162 230.063631,263.459162 C230.063631,263.459162 229.733296,259.807877 228.939888,258.963687 C227.961955,257.922905 223.493631,257.235084 223.493631,257.235084 L223.104972,239.253687 L216.880391,238.864525 L216.837654,234.498771 L229.804693,234.671732 C229.804693,234.671732 242.478603,225.028156 243.333855,215.912011 C243.852737,210.379777 244.84676,187.989385 244.84676,187.989385 L263.303296,187.902905 L263.43352,203.074693 C263.43352,203.074693 271.149888,206.342849 273.807151,205.927542 C282.75838,204.528771 300.861453,188.259888 305.317709,188.032626 C311.672011,187.708324 314.265419,204.111955 314.265419,204.111955 C314.265419,204.111955 309.363687,202.858994 308.819162,204.111955 C307.963408,206.080894 313.901899,208.720559 314.135698,210.854916 C314.378547,213.07676 309.50648,216.410782 309.726201,218.63514 C310.201844,223.433296 315.215698,228.101229 307.003575,247.423073 C305.258883,251.526872 316.080503,264.021285 316.080503,264.021285 L301.557318,264.151006 L301.427095,260.260894 L281.717095,260.390615 C281.717095,260.390615 271.614972,265.082682 267.842011,265.318492 C264.176648,265.547263 256.918324,262.387709 253.318324,263.113743 C251.223184,263.536089 248.003799,266.363296 245.40838,266.355251 C243.50581,266.349721 239.441229,264.089162 237.887598,265.188268 C237.02581,265.798156 237.109274,269.338324 237.109274,269.338324 C237.109274,269.338324 234.04676,272.428492 232.700279,272.839274 C231.009888,273.353128 225.654637,272.276145 225.654637,272.276145 Z" id="Shape"   ></Path>
            <Path fill={this._checkFill( 'Nou Barris')} onPress={this._pickNeighborhood.bind(this, 'Nou Barris')} d="M270.261955,162.572682 C271.730615,163.34095 276.399553,160.065754 276.399553,160.065754 C276.399553,160.065754 281.457151,167.197877 284.266257,167.241117 C286.276927,167.272291 286.06324,161.113073 287.724469,159.979777 C288.194078,159.659497 289.449553,159.857095 289.971955,159.633855 C291.970559,158.783128 295.092905,155.72514 297.406257,155.138883 C298.244413,154.926201 300.409441,154.426425 301.210391,154.10162 C303.164749,153.308715 307.261508,148.223464 307.261508,148.223464 C307.261508,148.223464 336.30838,134.261397 345.515028,116.756145 C345.912737,115.999944 348.00486,117.661676 348.93,116.929106 C352.257989,114.291955 359.995475,101.541117 359.995475,101.541117 L356.01838,96.0083799 C356.01838,96.0083799 352.290168,92.5275419 351.091006,92.7668715 C348.927486,93.1982682 347.471899,98.5655866 345.298827,98.9477095 C342.847207,99.3791061 339.196425,94.6096089 336.697039,93.9338547 C334.360056,93.3018436 329.323073,93.6472626 326.971508,93.0690503 C325.388212,92.6803911 322.622346,90.8914525 321.006872,90.4324022 C318.316425,89.6681564 312.059162,89.9140223 310.200838,91.1669832 C306.627486,93.5768715 302.042514,103.512067 297.752179,103.09676 C295.437318,102.873017 294.400056,96.7992737 292.089721,96.5267598 C290.51095,96.3407263 289.434469,99.5812291 287.896927,99.9844693 C285.966201,100.491285 281.066983,98.082905 279.943743,99.2931285 C278.801899,100.523464 280.159944,105.863128 278.084916,109.493799 C277.175363,111.086145 281.286704,114.462402 279.900503,115.977821 C279.324302,116.606816 276.687151,116.115587 276.528771,117.015084 C275.75095,121.424078 274.011788,128.351061 271.299218,130.760447 C270.005531,131.90933 266.056592,132.153687 265.117877,133.872235 C264.179665,135.588268 265.206872,139.924358 264.080615,141.52324 C263.479777,142.375978 260.745587,142.694749 260.709385,143.986425 C260.670168,145.362067 264.185196,146.806089 264.729218,147.746816 C266.253687,150.382458 265.895698,156.694525 270.174972,158.63933 C271.070447,159.046592 269.20257,162.017598 270.261955,162.572682 Z" id="Shape"   ></Path>
            <SvgText id="Nou-Barris" x="280.993164" y="117"  fontSize="12" font-weight="normal" fill="#FFFFFF">
                Nou Barris
            </SvgText>
            <Path fill={this._checkFill( 'Sant Andreu')} onPress={this._pickNeighborhood.bind(this, 'Sant Andreu')} d="M261.876872,184.876089 C262.006592,183.968045 267.473966,181.006592 268.61933,179.041173 C269.779777,177.050112 268.377989,171.987989 269.138212,169.704804 C269.894916,167.432179 273.287765,163.740168 275.751453,163.220782 C278.489162,162.644581 280.808547,168.79676 283.401955,171.390168 C283.954022,171.942235 285.901341,172.133296 286.514246,171.649609 C288.044749,170.441397 287.420782,165.690503 288.588771,164.128827 C291.21838,160.611285 299.784972,157.173184 303.630838,155.051397 C315.268994,148.632235 338.513128,137.545642 344.089106,120.558268 C344.325922,119.837263 346.941955,121.595531 346.941955,121.595531 C346.941955,121.595531 346.496983,150.581061 346.163631,160.238212 C346.05905,163.276592 345.734749,169.02 344.607486,172.297709 C342.635028,178.030056 333.066872,193.174693 331.380503,194.471899 C329.635307,195.814358 324.848715,191.536089 322.822458,192.396872 C320.553855,193.361732 317.894581,200.826201 317.11676,200.436536 C315.867821,199.812067 316.130279,193.229497 315.041732,191.10067 C313.772682,188.617374 308.66581,183.924804 305.964804,184.616648 C300.907207,185.913352 284.438715,197.195028 276.140112,202.252123 C274.127933,203.477933 268.56,203.004302 266.803743,200.955419 C265.247598,199.140335 266.285363,191.748268 266.285363,186.820894 C266.285363,185.547318 261.695866,186.137598 261.876872,184.876089 Z" id="Shape"   ></Path>
            <SvgText id="Exiample" x="168.136719" y="204"   fontSize="12" font-weight="normal" fill="#FFFFFF">
                Exiample
            </SvgText>
            <SvgText id="Ciutat-Vella" x="172.214355" y="241"   fontSize="9" font-weight="normal" fill="#FFFFFF">
                Ciutat Vella
            </SvgText>
            <SvgText id="Sants---Montjuic"  x="80.253906" y="251"  fontSize="11" font-weight="normal" fill="#FFFFFF">
                Sants - Montjuic
            </SvgText>
            <SvgText id="Sant-Marti"  x="246.244629" y="232" fontSize="11" font-weight="normal" fill="#FFFFFF">
                Sant Marti
            </SvgText>
            <SvgText id="Sant-Andreu" x="285.513672" y="170"   fontSize="9" font-weight="normal" fill="#FFFFFF">
                Sant Andreu
            </SvgText>
            <SvgText id="Les-Corts" x="109.842041" y="165"  fontSize="9" font-weight="normal" fill="#FFFFFF">
                Les Corts
            </SvgText>
            <SvgText id="Gracia" fontSize="11" font-weight="normal" fill="#FFFFFF" x="191.302979" y="175">
                Gracia
            </SvgText>
          </Svg>
        </View>
        <Button
          onPress={e => this.props.navigator.pop()}
          color='#F2504B'
          title='Set Neighborhood'/>
      </View>
    )
  }
}
