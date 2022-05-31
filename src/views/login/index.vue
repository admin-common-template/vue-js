<script setup name="Login">
import Cookies from 'js-cookie'
import JSEncrypt from 'jsencrypt'
import { login } from '@api/index'
import { ruleLogin } from '@validate/index'
import { useUserStore } from '@store/user'
import { cryptKey } from '@/common/config'

const jsencrypt = new JSEncrypt()

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const isRemenber = ref(false)
const ruleFormRef = ref(null)
const form = reactive({})
const rules = reactive(ruleLogin)

onMounted(() => {
  const userCache = Cookies.get('expires')
  if (userCache) {
    jsencrypt.setPrivateKey(cryptKey.privkey)
    const userCacheObj = Object.fromEntries(jsencrypt.decrypt(userCache).split('&').map((item) => item.split('=')))
    form.user_name = userCacheObj.user_name
    form.user_passwd = userCacheObj.user_passwd
    isRemenber.value = true
  }
})

// 执行登录操作
function handleSubmit(formEl) {
  formEl.validate(async (valid) => {
    if (valid) {
      const { code, data, msg } = await login(form)
      if (code === 0) {
        if (isRemenber.value) {
          jsencrypt.setPublicKey(cryptKey.pubkey)
          const encodedData = jsencrypt.encrypt(`user_name=${form.user_name}&user_passwd=${form.user_passwd}`)
          Cookies.set('expires', encodedData, { expires: 7 })
        }
        // 缓存用户信息
        await userStore.setUserInfo(data)
        // 前往内容首页
        router.push('/')
      } else {
        ElMessage.error(msg)
      }
    }
  })
}
</script>

<template>
  <div class="flex items-center justify-center w-full bg-[#f2f2f2]">
    <div class="relative w-[400px] shadow-[2px_2px_4px_#ccc]">
      <el-card class="box-card">
        <template #header>
          <div class="text-center">
            <span>模板后台系统</span>
          </div>
        </template>
        <el-form ref="ruleFormRef" :model="form" :rules="rules">
          <el-form-item prop="user_name">
            <el-input v-model="form.user_name" placeholder="请输入用户名" @change="(e) => form.user_name=e.trim()" clearable>
              <template #prefix><Iconify icon="fa-solid:user" /></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="user_passwd">
            <el-input type="password" v-model.trim="form.user_passwd" show-password placeholder="请输入密码" clearable>
              <template #prefix><Iconify icon="bx:bxs-lock" /></template>
            </el-input>
          </el-form-item>
          <el-form-item label="记住密码">
            <el-checkbox v-model="isRemenber"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleSubmit(ruleFormRef)" type="primary" :loading="loading" class="w-full">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
