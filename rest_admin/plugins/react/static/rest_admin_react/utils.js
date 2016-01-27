import fetch from 'isomorphic-fetch'


/*
 * Decode HTTP response returned by Django REST API
 */
const decodeResponse = response => {
  /* If error, format the error object and throw */
  if (response.status < 200 || response.status >= 300) {
    return response.json().then(value => {
      /* Flatten response value */
      const new_value = Object.keys(value).reduce((previous, current) => {
        const v = value[current]
        if (v) previous[current] = v.join('<br/>');
        return previous;
      }, {});

      /* Throw an exception */
      throw(Object.assign(
        {}, new_value,
        {_error: response.statusText, _status: response.status}
      ))
    });
  }

  /* If no error, return JSON */
  return response.json()
}


/* Initiate asynchronous GET fetch from the REST API */
export const apiGet = url => fetch(
  window.DJANGO_REST_API_URL + url + '?format=json', { credentials: 'same-origin' }
).then(decodeResponse);


/* Initiate asynchronous POST to the API */
export const apiPost = (url, data, method, headers) => fetch(
  window.DJANGO_REST_API_URL + url + '?format=json',
  {
    credentials: 'same-origin',
    method: method || 'post',
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    }, headers || {}),
    body: JSON.stringify(data)
  }
).then(decodeResponse);
