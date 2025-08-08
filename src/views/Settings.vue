<template>
  <el-card>
    <h2>系统设置</h2>
    <el-form label-width="100px" style="max-width: 400px;">
      <el-form-item label="主题">
        <el-select v-model="theme" placeholder="请选择主题">
          <el-option label="默认" value="default" />
          <el-option label="暗色" value="dark" />
        </el-select>
      </el-form-item>
      <el-form-item label="通知">
        <el-switch v-model="notify" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const theme = ref('default')
const notify = ref(true)
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
