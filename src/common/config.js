// layout布局相关配置
export const layout = {
  headerHeight: '90px', // 顶部区域高度
  collapseOn: '64px', // 导航菜单收起宽度
  collapseOff: '200px', // 导航菜单展开宽度
  bg: '#F5F7F9', // 背景
}

// 一级导航图标（iconify.js）
export const menuIcons = {
  dashboard: 'bx:bxs-home', // 组件
  demo: 'heroicons-outline:academic-cap', // 功能
  table: 'bi:table', // 表格
  charts: 'logos:highcharts', // 图表
  editor: 'gala:editor', // 富文本
}

/*
 * @description 分页可选条数配置
 */
export const pageSizeOpts = [20, 50, 100, 500, 1000]

// 加密公私钥
export const cryptKey = {
  privkey: 'MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQABAoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fvxTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeHm7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAFz/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIMV7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATeaTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5AzilpsLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Ozuku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876',
  pubkey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB',
}

// 项目正则匹配
export const regs = {
  username: {
    rule: /^[A-Za-z0-9\-_]{2,20}$/,
    remark: '2-20位字母、数字、下划线、短横线',
  },
  password: {
    rule: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%^&*()\-_+<>?:"{},.;'[\]]).{8,16}$/,
    remark: '8-16位包含字母大小写、数字、特殊字符',
  },
}

/*
 * @description 公共dom高度
 */
export const domHeight = {
  pageHeight: window.innerHeight - 90 - 12 - 2 - 16, // 页面可视高度：可用窗口高度 - 顶部区域90 - 内容padding12 - 边框2 - cardpadding16
  pagination: 42, // 分页区域高度
  cardPadding: 16, // 卡片内边距高度
}

const cellPadding = 8 // 表格单元格左右内边距和，同步cover.scss样式表设置的值
// 表格列宽
export const column = {
  sort: 70 + cellPadding, // 序号、排名、ID
  date: 140 + cellPadding, // 日期-年月日时分秒
  name: 120 + cellPadding, // 昵称
  url: 180 + cellPadding, // 链接地址
  status: 100 + cellPadding, // 状态
}

export default {
  title: '模板后台系统', // 后台系统标题
}
