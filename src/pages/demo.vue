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
    <ss-table :schema="demoSchema" :data="demoData" :stripe="true" :border="true"
    ></ss-table>
    <ss-card class="box-card" title="测试标题" :collapsable="true" shadow="hover">
      <template v-slot:opt>
        <el-button type="text">测试按钮</el-button>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ '正文内容 ' + o }}</div>
    </ss-card>
  </ss-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import demoJsonSchema, { demoTableData } from '@/pages/demo-json-schema'
import { Schema } from '@/components/types/common-types'

export default defineComponent({
  name: 'demo',
  setup () {
    const demoSchema = reactive<Schema>(demoJsonSchema)
    const demoData = reactive<any[]>(demoTableData)
    return {
      demoSchema,
      demoData
    }
  }
})
</script>

<style scoped>
</style>
