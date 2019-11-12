import Mock from 'mockjs'

import user from './user'
import system from './system'

const mocks = [
  ...user,
  ...system,
]

function XHR2ExpressReqWrap(respond) {
  return function(options) {
    let result = null
    const { body, type, url } = options
    if (respond instanceof Function) {
      result = respond({
        method: type,
        body: JSON.parse(body)
      })
    } else {
      result = respond
    }
    console.log(JSON.parse(body))
    console.log(result)
    return Mock.mock(result)
  }
}

mocks.forEach(item => {
  Mock.mock('/api' + item.url, item.type || 'post', XHR2ExpressReqWrap(item.response))
})