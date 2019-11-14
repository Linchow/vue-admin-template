import Mock from 'mockjs'

const permissionList = [
  {
    name: '首页',
    id: '1',
    path: '/home',
    icon: 'icon-home',
  },
  {
    name: '系统管理',
    id: '2',
    path: '/system',
    icon: 'icon-quanxian',
    children: [
      {
        name: '用户管理',
        id: '2-1',
        path: '/system/user',
      },
      {
        name: '角色管理',
        id: '2-2',
        path: '/system/role',
      },
    ]
  },
  {
    name: '错误页面',
    id: '3',
    path: '/error',
    icon: 'icon-error-page',
    children: [
      {
        name: '404',
        id: '3-1',
        path: '/error/404',
      },
      {
        name: '401',
        id: '3-2',
        path: '/error/401',
      },
    ]
  },
]

const userInfo = {
  uuid: 'd475c4f675b04ef7a63ba9b0310b8c08',
  userName: Mock.Random.cname(),
  loginName: 'admin',
  pwd: '123456',
  permissionList: permissionList
}

export default [
  {
    url: '/user/login',
    type: 'post',
    response(config) {
      let { loginName, pwd } = config.body;
      if(loginName !== userInfo.loginName || pwd !== userInfo.pwd) {
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
  {
    url: '/user/signOut',
    type: 'post',
    response(config) {
      return {
        code: 1000,
        data: true,
        msg: true
      }
    }
  },
]