<!--
 * @Title: demo
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2021/11/12 6:20 PM
 *     Date          UpdateBy        Description
 * 2021/11/12 6:20 PM   dscloudy    Create File.
 -->
<template>
  <ss-page>
    <ss-card class="box-card" title="测试标题" :collapsable="true" shadow="hover">
      <template v-slot:opt>
        <el-button type="text">测试按钮</el-button>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ '正文内容 ' + o }}</div>
    </ss-card>
  </ss-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'demo'
})
</script>

<style scoped>
</style>
