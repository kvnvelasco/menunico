import React, {Component} from 'react'
import {TextInput, Button} from 'react-native'
import {connect} from 'react-redux'
import {View, Text} from 'menunico/src/components'
import {replace} from 'menunico/src/state/actions/navigation'
class SignUp extends Component {

  _signup() {
    this.props.dispatch(replace('menunico', {
      key: 'restaurants'
    }))
  }

  render() {
    return (
      <View align='stretch' justify='space-between'  background='#58585A' padding={[120,20,60,20]}>
        <View align='center' padding={[10,10,0,10]}  flex={0}  style={{borderBottomWidth: 1, borderStyle: 'solid', borderColor: 'white', borderWidth: 0}}>
          <TextInput style={{fontSize: 22, height: 50, color: 'white'}} placeholder='Username' autoCorrect={false}
            placeholderTextColor='white'/>
        </View>
        <View align='center' padding={[10,10,0,10]}  flex={0}  style={{borderBottomWidth: 1, borderStyle: 'solid', borderColor: 'white', borderWidth: 0}}>
          <TextInput style={{fontSize: 22, height: 50, color: 'white'}} placeholder='Email' autoCorrect={false}
            keyboardType="email-address"
            placeholderTextColor='white'/>
        </View>
        <View align='center' padding={[10,10,0,10]}  flex={0}  style={{borderBottomWidth: 1, borderStyle: 'solid', borderColor: 'white', borderWidth: 0}}>
          <TextInput style={{fontSize: 22, height: 50, color: 'white'}} placeholder='Password' autoCorrect={false}
            secureTextEntry={true}
            placeholderTextColor='white'/>
        </View>
        <View flex={0} align='center'>
          <Button onPress={this._signup.bind(this)} color='#F2503F' title='Submit'/>
        </View>
        <View flex={0} align='center'>
          <Text color='white' align='center'>By creating an account you agree to our terms and conditions and our privacy policy</Text>
        </View>
      </View>
    )
  }
}


export default connect( store => ({
  store: store
}))(SignUp)
