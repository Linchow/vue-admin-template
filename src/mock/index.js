import Mock from 'mockjs'

Mock.mock('/api/login', 'post', config => {
  let {name, pwd} = JSON.parse(config.body);
  if(name !== 'admin' || pwd !== '123456') {
    return {
      code: 500,
      data: false,
      msg: '账号或密码输入错误，请重新输入'
    }
  } 
  return {
    code: 1000,
    data: {},
    msg: true
  }
})