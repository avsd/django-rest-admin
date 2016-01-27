import { apiGet } from '../../utils.js'

export const DJANGO_APPS_REFRESH = 'DJANGO_APPS_REFRESH';
export const DJANGO_APPS_REQUEST = 'DJANGO_APPS_REQUEST';
export const DJANGO_APPS_RECEIVE = 'DJANGO_APPS_RECEIVE';


/*
 * Initiate refresh of Django admin apps and models list from the API.
 */
export function refresh() {
    return { type: DJANGO_APPS_REFRESH }
}



/*
 * Send asynchronous API request to fetch data about Django admin apps and models.
 */
export function request() {
    return { type: DJANGO_APPS_REQUEST }
}


/*
 * Process Django admin apps and models data received from the REST API.
 */
export function receive(json) {
    return {
        type: DJANGO_APPS_RECEIVE,
        items: json,
        receivedAt: Date.now()
    }
}


/*
 * Thunk action creator for fetching Django apps from API asynchronously.
 */
export const fetchDjangoApps = () => dispatch => {
    dispatch(request());
    return apiGet('apps/')
    .then(json =>
      dispatch(receive(json))
    )
    
}
