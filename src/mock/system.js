import Mock from 'mockjs'

const userList = []
const count = 104

const roleName = ['系统管理员', '管理员', '总经理', '业务员', '主管', '专员']

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    id: '@increment',
    loginName: '@first',
    'roleName|1': roleName,
    userName: '@cname',
    phone: /^[1](([3][0-9])|([4][5-9])|([5][012356789])|([6][56])|([7][0-8])|([8][0-9])|([9][189]))[0-9]{8}$/,
    email: '@email',
    createBy: '@cname',
  }))
}

export default [
  {
    url: '/system/user/list',
    type: 'post',
    response(config) {
      const {pageSize, pageNo, userName, phone} = config.body;
      
      let tempList = userList.filter(item => {
        if(userName && item.userName.indexOf(userName) === -1) return false;
        if(phone && item.phone.indexOf(phone) === -1) return false;
        return true;
      })

      const pageList = tempList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))

      return {
        code: 1000,
        data: {
          list: pageList,
          total: tempList.length,
        },
        msg: true
      }
    }
  },
  {
    url: '/system/user/remove',
    type: 'post',
    response(config) {
      return {
        code: 1000,
        data: true,
        msg: true
      }
    }
  },
  {
    url: '/system/user/edit',
    type: 'post',
    response(config) {
      return {
        code: 1000,
        data: true,
        msg: true
      }
    }
  },
  {
    url: '/system/user/create',
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