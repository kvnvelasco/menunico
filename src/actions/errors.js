import raven from 'raven-js'
import raven_rn from 'raven-js/plugins/react-native'
import store from 'menunico/src/store'

// errors
export const error = {
  // Device / application related errors
  "000": "Application Failed to Initialize",
  "001": "Unknown Error occured on Bootstrap",
  "002": "Location Data Unavailable",
  "003": "No Internet Connection",
  // Api related errors
  "404": "No response from server",
  "500": "Bad response from server",
  "502": "Unknown Api Error",
  "401": "Timeout",
  // UI Related Errors
  "200": "Could not render view"
}

export class ApiError {
  constructor(xhrErrorObject) {
    this.rawError = xhrErrorObject
    // Inspect the error
    this.status = this.rawError.status
  }
  getMessage(status) {

  }
}

// switch (e.type) {
//   case 204:
//     ToastAndroid.show('Please check your internet connection (204)', ToastAndroid.LONG)
//     throw new Error('Please check your internet connection (204)')
//     break;
//   case 500:
//       ToastAndroid.show('Server could not process your request (500)', ToastAndroid.LONG)
//       throw new Error('Server could not process your request (500)')
//     break
//   case 503:
//     ToastAndroid.show('Please check your internet connection (503)', ToastAndroid.LONG)
//     throw new Error('Please check your internet connection (503)')
//     break;
//   default:
//     ToastAndroid.show('Unexpected Error. Please make sure you are connected to the internet', ToastAndroid.LONG)
//     throw new Error('An unknown exception occured during bootstrap')
// }

// Handlers

export function exceptionHandlersInit() {
  if(process.env.NODE_ENV === 'development') return console.logException = (msg, err) => console.error(msg, err)
   raven_rn(raven)
  raven
    .config('https://29553d0f5989462d9cbd4656a2838fa6@sentry.io/127539', { release: "0.2.4" })
    .install()

  console.logException = function(name, extra) {
    raven.captureException(name, {
      extra: {store: store.getState(), context: extra}
    });
    /*eslint no-console:0*/
    window.console && console.error && console.error(name);
  }
}
