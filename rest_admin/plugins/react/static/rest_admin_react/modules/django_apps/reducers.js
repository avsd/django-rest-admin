import {
  DJANGO_APPS_REFRESH,
  DJANGO_APPS_REQUEST,
  DJANGO_APPS_RECEIVE
} from './actions.js'


/*
 * Reducer for Django apps and ModelAdmin's
 */
function django_apps(state = {
  isFetching: false,
  didInvalidate: false,
  items: null
}, action) {
  switch (action.type) {

    case DJANGO_APPS_REFRESH:
      return Object.assign({}, state, {
        didInvalidate: true
      });

    case DJANGO_APPS_REQUEST:        
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case DJANGO_APPS_RECEIVE:        
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default django_apps;
