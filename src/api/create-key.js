const URL_BASE = __ENV__.REACT_APP_USER_KEYS_API_URL

export const createKey = token => () => {
  return fetch(URL_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
      Authorization: token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Request Error')
      }
    })
    .then(({ body }) => body)
}

export default createKey
