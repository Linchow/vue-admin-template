import Mock from 'mockjs'

const permissionList = [
  {
    name: '首页',
    id: '1',
    path: '/home',
    icon: 'icon-home',
  },
  {
    name: '错误页面',
    id: '2',
    path: '/error',
    icon: 'icon-error-page',
    children: [
      {
        name: '404',
        id: '2-1',
        path: '/error/404',
      },
      {
        name: '401',
        id: '2-2',
        path: '/error/401',
      },
    ]
  },
]

const userInfo = {
  uuid: 'd475c4f675b04ef7a63ba9b0310b8c08',
  name: Mock.Random.cname(),
  user: 'admin',
  pwd: '123456',
  permissionList: permissionList
}

export default [
  {
    url: '/user/login',
    type: 'post',
    response(config) {
      let { user, pwd } = config.body;
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
  },
  {
    url: '/user/info',
    type: 'post',
    response(config) {
      let { uuid } = config.body;
      if(uuid !== userInfo.uuid) {
        return {
          code: 500,
          data: false,
          msg: '获取用户信息失败，请重新登录！'
        }
      } 
      return {
        code: 1000,
        data: userInfo,
        msg: true
      }
    }
  },
]