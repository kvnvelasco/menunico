import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import {Text} from 'menunico/src/components/type'
import { ParagraphText } from 'menunico/src/composites/type'
import {ScrollView} from 'react-native'
export default class FAQ extends Component {


  render() {
    return (
      <View background='white' align='stretch' padding={[0,20,0,20]} margin={[60]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View align='stretch' margin={[0,0,15]} flex={0}>
            <Text size={24} color='#F2504B' align='center'>Frequently Asked Questions</Text>
          </View>
          <ParagraphText heading='Who can use menúnico?'>
            People who want to know in advance the menu of the day of the restaurants around their home and/or their work. Menúnico can be also useful for tourists that are not familiar with the city and its restaurants. Last but not least, menúnico can be used by the restaurant owners in order to publicize their daily menu.
          </ParagraphText>
          <ParagraphText heading='Why to use menúnico?'>
            By using the menúnico platform, users can explore in Spanish, Catalan and English the restaurants around them, giving them the chance to check the dishes (ingredients, allergies, images) of each menu and finally select their prefered restaurant! On the other hand restaurant owners, by using menúnico get the chance to publish daily their menu of the day in a fast, easy and efficient way!
          </ParagraphText>
          <ParagraphText heading='Is it necessary to register in menúnico in order to use it?'>
            If you want to explore the menu of the day of the restaurants around you, no, it is not necessary to register in menúnico. By registering though, you can enjoy all the benefits (favourite restaurants, favourite dishes, special offers, etc) of the menúnico. If you are a restaurant owner in order to list your business in the menúnico network, you need to register.
          </ParagraphText>
          <ParagraphText heading='What is menúnico?'>
            Menúnico is an index of the daily menus in the area of Barcelona, enabling people to find daily menus around them.
          </ParagraphText>
          <ParagraphText heading='How much does it cost to use the menúnico service?'>
            For the users that are exploring the menus of the day, is completely free of charge. For the restaurant owners, according to their subscription plan, different charges apply.
          </ParagraphText>
          <Text color='#F2504B'>Are you a restaurant Client?</Text>
          <ParagraphText heading='How can I mark restaurants and dishes as favorites?'>
            Those features can be used only by the registered users. Once you are registered and logged in, you can add a restaurant in your list by clicking in the heart next to the restaurant name. In order to mark as favourite a specific dish, after you login, you can click on the heart next to the name of the dish in the menu of the day of the selected restaurant. Afterwards, you can see the lists of your favourite restaurants and dishes in your user area in the tab Favourites.
          </ParagraphText>
          <ParagraphText heading='How can I find restaurants with menu of the day around me?'>
            By clicking the red button go in the landing page, you are transferred to a screen with a map on the right side and the list of the restaurants on the left side. By allowing your browser to access your location or by enabling the GPS in case of a mobile device, the map focuses around your location and in the list on the left you can see the available restaurants in a radius of 2km. You can also search the name of the restaurant or its address in the search bar.
          </ParagraphText>
          <Text color='#F2504B'>Are you a restaurant owner?</Text>
          <ParagraphText heading='How can I add my restaurant to menúnico?'>
            If you are a restaurant owner and you want to add your restaurant to menúnico, you need to register first and complete the various info in the restaurant profile. After an authentication procedure from the menúnico team, the restaurant is active and part of the menúnico network.
          </ParagraphText>
          <ParagraphText heading='How can I import the dishes of my restaurant?'>
            In the user area of the restaurant there is a tab My Dishes. In this tab there is a + sign, that by clicking at it a window pops up and there you can add the various details of your dish. By clicking Save, the dish is stored in the individual database of your restaurant and now it is available to be listed in a menu of the day!
          </ParagraphText>
          <ParagraphText heading='How can I create the menu of the day of my restaurant?'>
            In the user area of the restaurant there is a tab My Menus. In this tab there is a calendar. By clicking on your prefered day, a window pops up and there you can create the menu of the day by selecting the dishes, that you have previously added in the My Dishes tab, from the drop down menus. By clicking Save, the menu is stored in the individual database of the restaurant and it will be activated the selected day! Menúnico is offering a basic training on the functions of the platform free of charge. In case you need someone to help you import all your dishes and train you on how to create and publish your menus, there is an additional service provided by menúnico. More details regarding this service at info@menúnico.es.
          </ParagraphText>
          <ParagraphText heading='Do you have more questions?'>
            If you have any doubts or more questions, please contact us at info@menúnico.es
          </ParagraphText>
        </ScrollView>
      </View>
    )
  }
}
