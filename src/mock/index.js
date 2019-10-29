import Mock from 'mockjs'

import user from './user'

const mocks = [
  ...user,
]

function XHR2ExpressReqWrap(respond) {
  return function(options) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      result = respond({
        method: type,
        body: JSON.parse(body)
      })
    } else {
      result = respond
    }
    console.log(result)
    return Mock.mock(result)
  }
}

mocks.forEach(item => {
  Mock.mock('/api' + item.url, item.type || 'post', XHR2ExpressReqWrap(item.response))
})