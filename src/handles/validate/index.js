import { regs } from '@/common/config'
import { validateCommon } from './config'

// 空格
const pattern = '[^ \x22+]'

// 登录表单
export const ruleLogin = {
  user_name: [
    { required: true, pattern, message: '请输入账号', trigger: 'blur' },
    { validator: validateCommon(regs.username), trigger: 'blur' },
  ],
  user_passwd: [
    { required: true, pattern, message: '请输入密码', trigger: 'blur' },
    { validator: validateCommon(regs.password), trigger: 'blur' },
  ],
}
