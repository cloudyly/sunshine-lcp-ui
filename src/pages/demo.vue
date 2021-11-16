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
    <ss-form :schema="demoSchema"
             :model="formModel"
             :ui-schema="formUiSchema"
             @data-change="onFormChange"
    ></ss-form>
<!--    <ss-table :schema="demoSchema" :stripe="true" :border="true"-->
<!--              :ui-schema="uiSchema"-->
<!--              :data="demoData"-->
<!--              show-pagination="always"-->
<!--              :total="demoData.length"-->
<!--              :is-pseudo-paging="true"-->
<!--              :current-page="1"-->
<!--              :page-size="5"-->
<!--              height="300px"-->
<!--              :show-index="true"-->
<!--              selection-type="checkbox"-->
<!--              @current-change="onPageChange"-->
<!--              @size-change="onPageChange"-->
<!--              @selection-change="onSelectionChange"-->
<!--              :row-buttons="rowButtons"-->
<!--              @row-buttons-click="onRowButtonsClick"-->
<!--              :show-column-setting="true"-->
<!--              @opt-create-click="onOptCreateClick"-->
<!--              @opt-batch-delete-click="onOptBatchDeleteClick"-->
<!--    >-->
<!--      <template #name="{row, $index}">{{ row.name }} - Hello {{$index}}</template>-->
<!--    </ss-table>-->
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
import demoJsonSchema, { demoFormUiSchema, demoModel, demoTableData, demoUiSchema } from '@/pages/demo-json-schema'
import { Schema, UiSchema } from '@/components/types/common-types'

export default defineComponent({
  name: 'demo',
  setup () {
    const demoSchema = reactive<Schema>(demoJsonSchema)
    const uiSchema = reactive<UiSchema>(demoUiSchema)
    const demoData = reactive<any[]>(demoTableData)
    const onPageChange = (page: {currentPage: number, pageSize: number}) => {
      console.log(`分页发生变化: ${page.currentPage}, ${page.pageSize}`)
    }
    const demoIndexMethod = (index: number) => {
      return index + 1
    }
    const onSelectionChange = (selection: any) => {
      console.log(selection)
    }
    const keyModify = Symbol('btn_modify')
    const keyDelete = Symbol('btn_delete')
    const keyView = Symbol('btn_view')
    const rowButtons = () => {
      return [
        { key: keyModify, label: '修改' },
        { key: keyDelete, label: '删除' },
        { key: keyView, label: '查看' }
      ]
    }
    const onRowButtonsClick = (key: symbol, scope: any) => {
      if (key === keyModify) {
        console.log('修改', scope.row.name)
      } else if (key === keyDelete) {
        console.log('删除', scope.row.name)
      } else if (key === keyView) {
        console.log('查看', scope.row.name)
      }
    }
    const onOptBatchDeleteClick = (selectionList: any) => {
      console.log('批量删除', selectionList)
    }
    const onOptCreateClick = () => {
      console.log('新增')
    }

    const formModel = reactive(demoModel)
    const formUiSchema = reactive(demoFormUiSchema)
    const onFormChange = (key: string, value: any) => {
      console.log(key, value)
    }
    return {
      demoSchema,
      uiSchema,
      demoData,
      onPageChange,
      demoIndexMethod,
      onSelectionChange,
      rowButtons,
      onRowButtonsClick,
      onOptCreateClick,
      onOptBatchDeleteClick,
      formModel,
      formUiSchema,
      onFormChange
    }
  }
})
</script>

<style scoped>
</style>
