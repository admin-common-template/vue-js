import menuList from './data/menus'

// 用户登录
const login = {
  url: '/api/index/UserLogin',
  method: 'post',
  response: ({ body }) => {
    const { user_name: name, user_passwd: password } = body

    if (name !== 'admin' || password !== 'Admin123_') {
      return {
        code: -1,
        msg: '账户名或密码错误（admin/Admin123_)',
      }
    }
    return {
      code: 0,
      data: {
        nick_name: name,
      },
      msg: '欢迎回来',
    }
  },
}

// 用户登出
const userLogout = {
  url: '/api/index/userLogout',
  method: 'post',
  response: () => ({
    code: 0,
    data: null,
    msg: '登出成功',
  }),
}

// 获取用户菜单按钮权限
const GetMenu = {
  url: '/api/index/GetMenu',
  method: 'get',
  response: () => ({
    code: 0,
    data: {
      data: menuList,
      button: [],
    },
    msg: '',
  }),
}

export default [
  login,
  userLogout,
  GetMenu,
]
