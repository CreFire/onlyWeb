<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h2 class="login-title">登录</h2>
      <el-form
        :model="form"
        :rules="rules"
        ref="loginFormRef"
        label-width="90px"
        label-position="right"
        @keyup.enter="onLogin"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="username" size="large" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="current-password" show-password size="large" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item class="form-remember">
          <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            style="width:100%;"
            @click="onLogin"
            :loading="loading"
            round
          >登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const form = ref({
  username: '',
  password: '',
  rememberMe: false,
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const onLogin = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    setTimeout(() => {
      loading.value = false
      // 登录成功逻辑，通常调接口
      router.push('/')
    }, 1000)
  })
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}
.login-card {
  width: 370px;
  padding-bottom: 12px;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(60, 60, 100, 0.10);
}
.login-title {
  text-align: center;
  margin-bottom: 28px;
  font-size: 2rem;
  font-weight: 600;
  color: #222;
  letter-spacing: 2px;
}
.login-form :deep(.el-form-item) {
  margin-bottom: 22px;
}
.login-form :deep(.el-form-item__label) {
  font-size: 16px;
  color: #333;
  letter-spacing: 1px;
}
.login-form :deep(.el-input__wrapper) {
  border-radius: 8px;
}
.form-remember :deep(.el-form-item__content) {
  justify-content: flex-start;
}
.login-form :deep(.el-button) {
  font-size: 17px;
  border-radius: 8px;
  box-shadow: 0 2px 16px 0 rgba(58,122,254,0.08);
}
</style>
