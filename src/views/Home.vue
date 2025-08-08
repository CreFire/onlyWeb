<template>
  <el-container style="height:100vh;">
    <!-- 侧边栏 -->
    <el-aside width="220px" style="background:#263445;color:#fff;min-height:100vh;padding:0;">
      <el-menu
        default-active="home"
        background-color="#263445"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="onMenuSelect"
        style="border:none;height:100vh;"
      >
        <el-menu-item index="home">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="doc">
          <el-icon><Document /></el-icon>
          <span>文档</span>
        </el-menu-item>
        <el-menu-item index="guide">
          <el-icon><MenuIcon /></el-icon>
          <span>引导页</span>
        </el-menu-item>
        <el-menu-item index="auth">
          <el-icon><Lock /></el-icon>
          <span>权限测试页</span>
        </el-menu-item>
        <el-menu-item index="icon">
          <el-icon><Picture /></el-icon>
          <span>图标</span>
        </el-menu-item>
        <el-sub-menu index="components">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>组件</span>
          </template>
          <el-menu-item index="component1">组件1</el-menu-item>
          <el-menu-item index="component2">组件2</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="chart">
          <el-icon><DataAnalysis /></el-icon>
          <span>图表</span>
        </el-menu-item>
        <el-menu-item index="route">
          <el-icon><Share /></el-icon>
          <span>路由嵌套</span>
        </el-menu-item>
        <el-menu-item index="table">
          <el-icon><TableIcon /></el-icon>
          <span>Table</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header style="background:#fff;color:#333;display:flex;align-items:center;justify-content:space-between;height:56px;box-shadow:0 2px 8px #f0f1f2;">
        <div style="display:flex;align-items:center;">
          <el-icon style="font-size:22px;margin-right:16px;color:#3a7afe;"><MenuIcon /></el-icon>
          <span style="font-size:18px;font-weight:bold;color:#3a7afe;">管理后台</span>
        </div>
        <div style="display:flex;align-items:center;gap:16px;">
          <el-input placeholder="搜索..." size="small" style="width:180px;">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button :icon="FullScreen" circle size="small" />
          <el-button :icon="Message" circle size="small" />
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar size="small" style="background:#3a7afe;">
                <el-icon><User /></el-icon>
              </el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided @click="onMenuSelect('logout')">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main style="background:#f5f6fa;">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="租户列表" name="tenant">
              <el-table :data="tenantList" border style="width:100%;margin-top:18px;">
                <el-table-column prop="id" label="租户ID" width="120" />
                <el-table-column prop="name" label="租户名称" />
                <el-table-column prop="createdAt" label="创建时间" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="用户列表" name="user">
              <div style="margin-bottom:12px; display:flex; justify-content:flex-end;">
                <el-button type="primary" @click="showCreateUser = true">新增用户</el-button>
              </div>
              <el-table :data="userList" border style="width:100%;">
                <el-table-column prop="id" label="用户ID" width="120" />
                <el-table-column prop="username" label="用户名" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="tenant" label="所属租户" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>

        <!-- 新增用户弹窗 -->
        <el-dialog v-model="showCreateUser" title="新增用户" width="400px" @close="resetUserForm">
          <el-form :model="newUser" :rules="userRules" ref="userFormRef" label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="newUser.username" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="newUser.email" />
            </el-form-item>
            <el-form-item label="所属租户" prop="tenant">
              <el-select v-model="newUser.tenant" placeholder="请选择">
                <el-option v-for="t in tenantList" :key="t.name" :label="t.name" :value="t.name" />
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="showCreateUser = false">取消</el-button>
            <el-button type="primary" @click="handleCreateUser" :loading="creatingUser">确定</el-button>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { House, Document, Menu, Lock, Picture, DataAnalysis, Share, Grid, User, FullScreen, Message, Search } from '@element-plus/icons-vue'

import { Grid as TableIcon } from '@element-plus/icons-vue'
import { createUser, getUserList } from '@/api/user'

const router = useRouter()
const activeTab = ref('tenant')

const tenantList = ref([
  { id: 1, name: '租户A', createdAt: '2024-05-25' },
  { id: 2, name: '租户B', createdAt: '2024-05-24' },
  { id: 3, name: '租户C', createdAt: '2024-05-23' },
])
const userList = ref<any[]>([])
const showCreateUser = ref(false)
const creatingUser = ref(false)
const userFormRef = ref()
const newUser = ref({
  username: '',
  email: '',
  tenant: '',
})
const userRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
  ],
  tenant: [{ required: true, message: '请选择租户', trigger: 'change' }]
}

// 侧边栏与顶部菜单事件
const onMenuSelect = (index: string) => {
  if (index === 'logout') {
    router.replace('/login')
  } else if (index === 'settings') {
    router.push('/settings')
  } else if (index === 'home') {
    router.push('/')
  }
}

// 获取用户列表
const loadUserList = async () => {
  try {
    const res = await getUserList()
    console.log('getUserList返回：', res.data)
    // 判断是数组才赋值，否则清空
    if (Array.isArray(res.data)) {
      userList.value = res.data
    } else if (res.data && Array.isArray(res.data.data)) {
      userList.value = res.data.data
    } else {
      userList.value = []
    }
  } catch (e) {
    userList.value = []
  }
}

// 新建用户
const handleCreateUser = async () => {
  if (!userFormRef.value) return
  await userFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    creatingUser.value = true
    try {
      await createUser(newUser.value)
      showCreateUser.value = false
      loadUserList()
      resetUserForm()
    } finally {
      creatingUser.value = false
    }
  })
}

const resetUserForm = () => {
  newUser.value = { username: '', email: '', tenant: '' }
  userFormRef.value?.clearValidate()
}

onMounted(() => {
  loadUserList()
})
</script>
