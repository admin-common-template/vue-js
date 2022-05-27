// 通用校验方法，传入校验规则对象
export const validateCommon = (ruleObj = {}) => (elRule, value, callback) => {
  const { rule, remark } = ruleObj
  if (rule && rule.test(value)) {
    callback()
  } else {
    callback(new Error(`格式不正确：${remark}`))
  }
}
