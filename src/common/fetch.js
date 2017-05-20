import isomorphicFetch from 'isomorphic-fetch'

const defaultOption = {
  credentials: 'include',
  headers: {'Content-Type': 'application/json;charset=UTF-8'}
}
// support timeout, 10000ms as default
// fetch('/getUserInfo', { timeout: 2000})
export default function fetch(url, {timeout = 10000, ...options} = {}) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Fetch timeout[${timeout}ms][${url}]`))
    }, timeout)
    isomorphicFetch(url, {...defaultOption, ...options}).then(
      (res) => {
        clearTimeout(timeoutId)
        resolve(res)
      },
      (err) => {
        clearTimeout(timeoutId)
        reject(err)
      }
    )
  })
}
