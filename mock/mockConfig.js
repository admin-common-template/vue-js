export const config = {
  limit: 10,
  timeout: 1000,
}

export const transParams = (params) => {
  const transToNumber = ['page', 'limit']
  transToNumber.map((item) => {
    if (Reflect.has(params, item)) params[item] = Number(params[item])
  })
  return params
}
