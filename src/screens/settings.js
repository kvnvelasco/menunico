import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Navigator } from 'menunico/src/composites/navigation'
import { Text } from 'menunico/src/components/type'
import { ParagraphText } from 'menunico/src/composites/type'
import {Button, InteractionManager, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {CheckBox, CheckImage} from 'menunico/src/components/interactive'


class Settings extends Component {
  render() {
    return (
      <View background='white' margin={[60]} align='stretch'>
        <Navigator
          id='settings'
          data={this.props.navigator}
          dispatch={this.props.dispatch}>
          <Home key='home'/>
          <About key='about'/>
          <Terms key='terms' />
          <Privacy key='privacy' />
        </Navigator>
      </View>
    )
  }
}

export default connect( store => ({
  navigator: store.navigation.settings
}))(Settings)

class Home extends Component {
  _navigateTo(location) {
    const route = {key: location}
    InteractionManager.runAfterInteractions(e => {
      this.props.dispatch(this.props.navigator.push('settings', route))
    })
  }
  render() {
    return (
      <View padding={[20,20,20,20]} align='stretch' background='white'>
        <Text align='center' size={20} color='#F44E3F'>Settings</Text>
        <TouchableOpacity>
          <View direction='row' align='stretch' justify='space-between' flex={0} margin={[20,0,20]}>
            <Text size={17}>Communication</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._navigateTo.bind(this, 'about')}>
          <View direction='row' align='stretch' justify='space-between'  flex={0} margin={[60,0,20]}>
            <Text size={17}>About</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View direction='row' align='stretch' justify='space-between'  flex={0} margin={[60,0,20]}>
            <Text size={17}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

class About extends Component {
  _navigateTo(location) {
    const route = {key: location}
    InteractionManager.runAfterInteractions(e => {
      this.props.dispatch(this.props.navigator.push('settings', route))
    })
  }
  render() {
    return (
      <View padding={[20,20,20,20]} align='stretch' background='white'>
        <Text align='center' size={20} color='#F44E3F'>About</Text>
        <TouchableOpacity onPress={this._navigateTo.bind(this, 'terms')}>
          <View direction='row' align='stretch' justify='space-between' flex={0} margin={[20,0,20]}>
            <Text>Terms and Conditions</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._navigateTo.bind(this, 'privacy')}>
          <View direction='row' align='stretch' justify='space-between'  flex={0} margin={[20,0,20]}>
            <Text>Data Privacy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={
          console.log(null)
          // this._navigateTo.bind(this, 'version')
          }>
          <View direction='row' align='stretch' justify='space-between'  flex={0} margin={[20,0,20]}>
            <Text>Version</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

class Terms extends Component {
  render() {
    return (
      <View background='white' align='stretch' padding={[0,20,0,20]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View align='stretch' margin={[0,0,7]} flex={0}>
            <Text size={20} color='#F2504B' align='center'>Terms and Conditions</Text>
          </View>
          <ParagraphText size={12} heading='Definitions'>
            {"\n"}“You” and “Your” means You as the user of our Website
            {"\n"}“Agreement” means these Terms and Conditions
            {"\n"}“Conditions” means the terms of how you may use our Website
            {"\n"}“Menúnico” means the Owner, Administrator and Data Controller of our Website
            {"\n"}(includes “us, “we” or “our”)
            {"\n"}“Members” means subscribers registered with their details on the Website whether directly or through third party applications and websites
            {"\n"}“Basic Membership” means the services of our website accessible to Basic Subscriber Members
            {"\n"}“Premium Membership” means the services of our website accessible only to Premium Subscriber Members.
            {"\n"}“Premium Plus Membership” means the services of our website accessible only to Premium Plus Subscriber Members
            {"\n"}“Website” means the website (or Site) owned and administered by Nikolaos Christianos under the brand Menúnico and located at www.menúnico.es
          </ParagraphText>
          <ParagraphText size={12} heading='1. INTRODUCTION'>
            {"\n"}Menúnico is a service platform registered at Carrer Torrent d’en Vidalet 21, Barcelona, Spain.
            {"\n"}Menúnico is a restaurant menu web platform bringing restaurants and customers together.
          </ParagraphText>
          <ParagraphText size={12} heading='2. Menúnico TERMS OF USE'>
            {"\n"}2.1 Conditions of use
            {"\n"}Use of the Site is primarily for accessing service needs you may have. Use of the Site in any other way, including in contravention of any restrictions on use set out in this policy, is not permitted. If you do not agree with the terms of this policy, you may not use the Site.
            {"\n"}You agree that you are solely responsible for:
            {"\n"}  • all costs and expenses you may incur in relation to your use of the Site; and
            {"\n"}  • keeping your password and other account details confidential
            {"\n"}You accept that you are responsible for compliance with local laws where they are applicable.
            {"\n"}We seek to make the Site as accessible as possible. If you have any difficulties using the Site, please contact us at by using the accessibility tools available at [insert link to accessibility tools]
            {"\n"}We may prevent or suspend your access to the Site if you do not comply with any part of our terms or any applicable law.
            {"\n"}a. Standards of accuracy, decency and lawfulness:
            {"\n"}As a condition of your use of the Site, you agree:
            {"\n"}not to use the Site for any purpose that is unlawful under any applicable law or prohibited by terms and conditions of use;
            {"\n"}    • not to use the Site to commit any act of fraud;
            {"\n"}    • not to use the Site to distribute viruses or malware or other similar harmful software code
            {"\n"}    • not to use the Site for purposes of promoting unsolicited advertising or sending spam;
            {"\n"}    • not to use the Site to simulate communications from us or another service or entity in order to collect identity information, authentication credentials, or other information (‘phishing’);
            {"\n"}    • not to use the Site in any manner that disrupts the operation of our Site or business or the website or business of any other entity;
            {"\n"}    • not to promote any unlawful activity;
            {"\n"}    • not to represent or suggest that we endorse any other business, product or service unless we have separately agreed to do so in writing;
            {"\n"}    • not to post comments with malicious intent toward Members or Menúnico, whether directly or indirectly;
            {"\n"}    • not to use the Site to gain unauthorised access to or use of computers, data, systems, accounts or networks;
            {"\n"}    • not to attempt to circumvent password or user authentication methods; and
            {"\n"}    • to comply with the provisions relating to our intellectual property rights and software.
            {"\n"}b. Variations to terms and acceptance thereof
            {"\n"}  Menúnico reserve the right to vary these terms and conditions from time to time. Our new terms will be displayed on the Site and by continuing to use and access the Site following such changes, you agree to be bound by any variation made by us. It is your responsibility to check these terms and conditions from time to time to verify such variations. Where possible, Menúnico will notify Members of any variations in terms and fees by email to the registered email address used when registering on the platform.
            {"\n"}c. Accessing the site
            {"\n"}  Access to our website is permitted on a temporary basis and we reserve the right to withdraw or amend the service without notice. You are responsible for making all arrangements necessary to access this website. You are also responsible for ensuring that all persons accessing our website through your internet connection are aware of these Terms and Conditions.
            {"\n"}  2.2 All Members agree that by using the Site, shall not be held liable whatsoever for any losses or damages suffered by said Members from their use of the software, including but not limited to any loss of data, inability to access data, any system downtime, any delay in or shortfall in customer service and support, any malfunction in the software and/or website, any delay in retrieving information or accuracy thereof.
          </ParagraphText>
          <ParagraphText size={12} heading='3. ACCOUNT REGISTRATION & FEATURES'>
            {"\n"}3.1 Restaurant Owners - Members
            {"\n"}Access to the site is controlled by a username which is the email address used when registering on the site, and a password.
            {"\n"}After registration, the site can be used for promoting your menu of the day, provide a visual representation of your dish, stay up to date with customers’ preferences and open networking opportunities.
            {"\n"}3.2 Customers
            {"\n"}Accessing the site gives customers the opportunity to explore menus of the day from restaurants around your location. Information provided includes pictures of dishes, ingredients as well as nutritional and allergy detail. Customers will also be able to bookmark their favourite restaurants and receive notifications based on saved preferences.
          </ParagraphText>
          <ParagraphText size={12} heading='4. ADHERANCE TO OUR TERMS & CONDITIONS'>
            {"\n"}Members must ensure the site is not used for any purpose which may be directly or indirectly used illegally or used in any way contrary to Menúnico’s Terms and Conditions. This includes responsibility for information sourced through Menúnico being passed on to a Third Party
            {"\n"} Members must not:
            {"\n"} • Post any material which is obscene or offensive
            {"\n"}  • Promote discrimination based on race, sex, religion, nationality, disability, sexual orientation or age;
            {"\n"}  • infringe any copyright, database right or trade mark of any other person;
            {"\n"}   • contain any unsolicited or unauthorised advertising, promotional Menúnico materials, junk mail, spam, chain letters, pyramid schemes or other forms of solicitation or advertisement commercial or otherwise;
            {"\n"}  • be made in breach of any legal duty owed to a third party such as a contractual duty or a duty of confidence;
            {"\n"}  • be likely to harass any other person;
            {"\n"}  • be likely to disrupt our service in any way;
            {"\n"}  • give the impression that they emanate from us where this is not the case; and
            {"\n"} • advocate, promote or assist any unlawful act such as (by way of example only) copyright infringement or computer misuse.
          </ParagraphText>
          <ParagraphText size={12} heading='5. SUBSCRIPTIONS'>
            {"\n"}5.1 Selecting the Service
            {"\n"}Menúnico provides three subscription levels, Basic, Premium, PremiumPlus.
            {"\n"}Basic 6.99 €/month +VAT
            {"\n"}  • Restaurant page
            {"\n"}  • Appear on the map
            {"\n"}  • 1 Photo of the Restaurant
            {"\n"}  • Basic restaurant info
            {"\n"}  • Publish menu of the day: Weekdays
            {"\n"}  • Advertisement: menunico.es
            {"\n"}  • Preview's dishes: 1
            {"\n"}  • Top listed Statistics: On Demand

        {"\n"}    {"\n"}Premium 9.99 €/month +VAT
            {"\n"}  • All features of Basic and:
            {"\n"}  • 5 Photos of the Restaurant
            {"\n"}  • Photos of the dishes
            {"\n"}  • Extended restaurant info
            {"\n"}  • Publish menu of the day: Everyday
            {"\n"}  • Advertisement: menunico.es + Social Media
            {"\n"}  • Preview's dishes: 3
            {"\n"}Premium Plus 24.99 €/month +VAT
            {"\n"}  • All fetures of Premium and:
            {"\n"}  • Unlimited photos of Restaurant
            {"\n"}  • Advertisement: menunico.es + Social Media + email
            {"\n"}  • Top listed Statistics: Free
            {"\n"}  • Suggest a dish
            {"\n"}5.2 New Subscriptions
            {"\n"}5.2.1 For subscriptions received through the Platform, Members receive one month free within any chosen subscription type with automatic annual renewal for 1 year.
            {"\n"}5.2.2 For subscriptions through a sales representative, Menúnico offer Members three months for the price of one within any chosen subscription type with automatic annual renewal for 1 year.
            {"\n"}5.3 Payment
            {"\n"}Subscriptions are charged on an annual rolling fee through a third party payment gateway.
            {"\n"}5.4 Communication via Menúnico
            {"\n"}Menúnico will notify all registered Members of any service changes and updates as soon as reasonably practicable. All subscription fee increases will be notified to Members at least 30 days in advance by email to the registered address and with notifications on the site.
            {"\n"}5.5 Service Reviews
            {"\n"}  Members are expected to conduct themselves in a professional capacity whilst using the site. This includes refraining from all defamatory remarks and communicating clearly with Menúnico and giving us fair opportunity to rectify and remedy any concerns and issues which you may raise with us.

          </ParagraphText>
          <ParagraphText size={12} heading='6. SECURITY OF DATA'>
            {"\n"}6.1 Members agree to ensure the security of their data and the protection of their privacy.
            {"\n"}6.2 Members must have security measures in place to prevent any unauthorised or unlawful access, disclosure, loss, destruction or damage to information held.
            {"\n"}6.3 It is each user’s responsibility to ensure their menus and images are backed up outside of the site. Menúnico do not offer any guarantees to the accessibility of this data at any time.
          </ParagraphText>
          <ParagraphText size={12} heading='7. NON COMPLIANCE'>
            {"\n"}7.1 Menúnico reserves the right to cancel registration or refuse access to the site. We shall not be liable for any loss or damages whatsoever arising from a User’s inability to access any pages or features on the site. Menúnico further reserves the right to ban User’s IP address if the user abuses our site features.
            {"\n"}7.2 Menúnico retains the right to prosecute and seek damages, both direct and indirect to the fullest extent permitted under law, arising from any Members found to be mis-using the software (and/or website), using the software (and/or website) in contravention of these Terms and Conditions, or using the software (and/or website) in breach of any applicable national or international law.
          </ParagraphText>
          <ParagraphText size={12} heading='8. ELIGIBILITY'>
            {"\n"}Appropriate use
            {"\n"}8.1 Accessing restrictions
            {"\n"}You must provide current and accurate information (for example correct name and correct address) upon registration for the Platform.
            {"\n"}As part of the subscription process, after registration and payment, Menúnico will carry out a verification process on the information provided. This includes processing personal information (name, address, owner details including any additional information as required).
            {"\n"}For details on how we process and store your personal information, please refer to our Privacy Policy.

            {"\n"}Members are required to update their menu regularly to ensure information is accurate and up to date. Any Members who have not updated their menu for 15 days agree that their account will be disabled. All disabled accounts can be re-enabled by emailing us at info@menúnico.es

            {"\n"}By agreeing to our terms and using the site you acknowledge that any breach of these terms will result in any accounts involved being banned automatically.

          </ParagraphText>
          <ParagraphText size={12} heading='9. TERMINATION'>
            {"\n"}Subscriptions are charged on an annual basis therefore any user wanting to cancel their subscription can downgrade back to a cheaper subscription or delete their account at the end of the annual term. If the payment method on file is not active, and failing payment of subscription, access to the site will cease. Menúnico advises all Members to back up all their data prior to deleting their account. Menúnico do not keep records of data and images stored on the site.

            {"\n"}Menúnico reserves the right to terminate a user’s account with immediate effect, if there is a breach of confidence from the user. This includes abnormalities in the Members account such as criminal / terrorist and/or amoral activities.


          </ParagraphText>
          <ParagraphText size={12} heading='10. INDEMNITY'>
            {"\n"}To the fullest extent permissible by law, we exclude and disclaim all warranties, terms, conditions and representations that might otherwise be implied by law in relation to this Website. In particular, we do not represent or warrant that the Website will be error-free, free of viruses or other harmful components, or that defects will be corrected. You must take Your own precautions in this respect.

            {"\n"}We shall not be liable, under these Terms and Conditions for any indirect, special, incidental or consequential damages or otherwise, even if advised of the possibility of such damages.

            {"\n"}Menúnico accepts no liability for any Loss arising out of the use of the information on the Website. Menúnico shall not be liable for deletion of files, mistakes, omissions, interruptions, errors, defects, delays in operations, transmission or any failure of performance or the inadvertent corruption of data transmitted, received or stored on the Website, whether or not limited to theft, acts of God, destruction, communication failure or unauthorized access to Menúnico records or the Website. This clause shall apply to all contents on the Website.

            {"\n"}Menúnico shall not be liable for all or any indirect, incidental and consequential loss or damage, including but not limited to loss of profit, business, revenue, goodwill or anticipated savings, howsoever caused arising directly or indirectly in connection with the use or reliance by any User on the Materials or the information provided on the Website including without limitation, default or any acts of Menúnico, its employees, loss of data, inability to access the Internet, inability to transmit or receive information caused by or resulting from delays or interruptions, even if Menúnico has been advised of the possibility of such damages.
          </ParagraphText>
          <ParagraphText size={12} heading='11. GOVERNING LAW & JURISDICTION'>
            {"\n"}The validity, construction and performance of this Agreement, and any claim, dispute or matter arising under or in connection with it or its enforceability, will be governed by and construed in accordance with the exclusive law of Spain and subject to the jurisdiction of the Spanish courts.
          </ParagraphText>
          <ParagraphText size={12} heading='12. CONFIDENTIALITY'>
            {"\n"}Each party undertakes that it shall keep any information that it has or acquires that is confidential in nature concerning the other party including, without limitation, its business, affairs, Members, suppliers, plans or strategy and that it shall not use or disclose the other party's Confidential Information to any person, except as permitted by clauses following:

              {"\n"}A party may:

              {"\n"}i. Disclose any Confidential Information to any of its employees, officers, representatives or advisers (Representatives) who need to know the relevant Confidential Information for the purposes of the performance of any obligations under this agreement, provided that such party must ensure that each of its Representative to whom Confidential Information is disclosed is aware of its confidential nature and agrees to comply with this clause as if it were a party;

              {"\n"}ii. Disclose any Confidential Information as may be required by law, any court, any governmental, regulatory or supervisory authority (including, without limitation, any securities exchange) or any other authority of competent jurisdiction to be disclosed; and

              {"\n"}a. Uses Confidential Information only to perform any obligations under this agreement.

              {"\n"}This clause will bind the parties during the term of this agreement and for a period of two years following termination of this agreement.
          </ParagraphText>
          <ParagraphText size={12} heading='13. Intellectual Property Rights'>
            {"\n"}13.1 Nothing in the Contract will affect the rights (including Intellectual Property Rights) in Menúnico Materials which are and shall remain vested in Menúnico.
            {"\n"}Members:
              {"\n"}• will not use Menúnico Materials for any other purpose;
              {"\n"}• will not modify or reverse engineer or take any similar action in relation to any propriety software of Menúnico (except so far as required for interoperability)
            {"\n"}13.2 Members agree that any images uploaded are free of any intellectual property rights, royalties, title and licence and give Menúnico unrestricted access and licence to use uploaded information for promotion and marketing purposes.
          </ParagraphText>
        </ScrollView>
      </View>

    )
  }
}

class Privacy extends Component {
  render() {
    return (
      <View background='white' align='stretch' padding={[0,20,0,20]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View align='stretch' margin={[0,0,7]} flex={0}>
            <Text size={20} color='#F2504B' align='center'>Data Privacy</Text>
          </View>
          <ParagraphText size={12} heading=''>
            {"\n"}Menúnico takes your privacy very seriously. We ask that you read this Privacy and Cookies Policy carefully as it contains important information about what to expect when we collect personal information about you and how we will use your personal data.
            {"\n"}This policy applies to information we collect about:
            {"\n"}• visitors to our website; and
            {"\n"}• people who do business with us.
          </ParagraphText>
          <ParagraphText size={12} heading='1. The information we collect about you'>
            {"\n"}When you do business with we collect the following personal information from you:
            {"\n"}1.1 name
            {"\n"}1.2 IP Address
          </ParagraphText>
          <ParagraphText size={12} heading='2. How we will use the information about you'>
            {"\n"}We gather this information to allow us to communicate with you on any matter relating to the provision of the services in general. If you agree, we may also contact you about other products and services we think may be of interest to you.
            {"\n"}We may also use aggregate information and statistics for the purposes of monitoring website usage in order to help us to develop our website and our services. We may also provide such aggregate information to third parties. These statistics will not include information that can be used to identify you.
            {"\n"}From time to time we may provide your information to our customer service agencies for research and analysis purposes so that we can monitor and improve the good and services that we provide. We may contact you to ask you for your feedback and comments on our goods and services.
          </ParagraphText>
          <ParagraphText size={12} heading='3. Marketing'>
            {"\n"}We may also wish to provide you with information about special features of our website or any other service or products we think may be of interest to you. If you would rather not receive this information, please send a blank email message to info@menunico.es. If you agree to us providing you with marketing information, you can always opt out at a later date.

            {"\n"}We may also want to provide you with related information from third parties we think may be of interest to you. If you would rather not receive this information, please send an email to info@menúnico.es. If you agree to us providing you with third party marketing information, you can always opt out at a later date.
          </ParagraphText>
          <ParagraphText size={12} heading='4. Our use of cookies and other information-gathering technologies'>
            {"\n"}Cookies are text files placed on your computer to collect standard Internet log information and visitor behaviour information. The information is used to track visitor use of the website and to compile statistical reports on website activity. For further information about cookies visit [www.aboutcookies.org] or [www.allaboutcookies.org]. You can set your browser not to accept cookies and the above websites tell you how to remove cookies from your browser. However, in a few cases some of our website features may not function if you remove cookies from your browser.
          </ParagraphText>
          <ParagraphText size={12} heading='5. How we protect your information'>
            {"\n"}We have put in place the following security procedures and technical and organisational measures to safeguard your personal information: firewalls, browser certification technology, encryption.

            {"\n"}We will use all reasonable efforts to safeguard your personal information. However, you should be aware that the use of the Internet is not entirely secure and for this reason we cannot guarantee the security or integrity of any personal information which is transferred from you or to you via the Internet.
          </ParagraphText>
          <ParagraphText size={12} heading='6. Sale of business'>
            {"\n"}If our business is sold or integrated with another business your details may be disclosed to our advisers and any prospective purchasers and their advisers and will be passed on to the new owners of the business.
          </ParagraphText>
          <ParagraphText size={12} heading='7. Your consent'>
            {"\n"}By submitting your personal information, you consent to the use of that information as set out in this policy.
          </ParagraphText>
          <ParagraphText size={12} heading='8. Changes to our Policies'>
            {"\n"}We keep our Privacy and Cookies Policy under regular review. If we change our Policies we will post the changes on this page, and place notices on other pages of the website, so that you may be aware of the information we collect and how we use it at all times. This Policy was last updated on 1/11/2016
          </ParagraphText>
          <ParagraphText size={12} heading='9. How to contact us'>
            {"\n"}We welcome your views about our website and our Privacy Policy. If you would like to contact us with any queries or comments, please send an email to info@menúnico.es or send a letter to Menúnico, Torrent d'en Vidalet 21, 1-2, 08012, Barcelona

          </ParagraphText>
          <ParagraphText size={12} heading='10. Links to other websites'>
            Our website may contain links to other websites. This Privacy Policy only applies to this website so when you access links to other websites you should read their own privacy policies.
          </ParagraphText>
        </ScrollView>
      </View>

    )
  }
}
