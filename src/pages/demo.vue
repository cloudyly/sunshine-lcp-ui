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
              show-pagination="always"
              :total="demoData.length"
              :is-pseudo-paging="true"
              :current-page="1"
              :page-size="3"
              height="300px"
              :is-show-index="true"
              :indexMethod="demoIndexMethod"
              @current-change="onPageChange"
              @size-change="onPageChange"
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
    const onPageChange = (page: {currentPage: number, pageSize: number}) => {
      console.log(`分页发生变化: ${page.currentPage}, ${page.pageSize}`)
    }
    const demoIndexMethod = (index: number) => {
      return index + 1
    }
    return {
      demoSchema,
      demoData,
      onPageChange,
      demoIndexMethod
    }
  }
})
</script>

<style scoped>
</style>
