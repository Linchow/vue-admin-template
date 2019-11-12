import Mock from 'mockjs'

const userList = []
const count = 104

const role = ['系统管理员', '管理员', '总经理', '业务员', '主管', '专员']

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    id: '@increment',
    loginName: '@first',
    'roleName|1': role,
    userName: '@cname',
    phone: /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/,
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