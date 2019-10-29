import Mock from 'mockjs'

const userInfo = {
  uuid: 'd475c4f675b04ef7a63ba9b0310b8c08',
  name: Mock.Random.cname(),
  user: 'admin',
  pwd: '123456'
}

export default [
  {
    url: '/user/login',
    type: 'post',
    response(config) {
      let {user, pwd} = config.body;
      if(user !== userInfo.user || pwd !== userInfo.pwd) {
        return {
          code: 500,
          data: false,
          msg: '账号或密码输入错误，请重新输入'
        }
      } 
      return {
        code: 1000,
        data: userInfo,
        msg: true
      }
    }
  }
]