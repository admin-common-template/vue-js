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

export default [
  login,
]
