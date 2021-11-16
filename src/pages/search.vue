<!--
 * @Title: search
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2021/11/16 3:55 PM
 *     Date          UpdateBy        Description
 * 2021/11/16 3:55 PM   dscloudy    Create File.
 -->
<template>
  <ss-page>
    <ss-search-card :schema="schema"
                    :uiSchema="uiSchema"
                    :model="model"
    ></ss-search-card>
  </ss-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Schema, UiSchema } from '@/components/types/common-types'

export default defineComponent({
  name: 'search',
  setup () {
    const schema: Schema = reactive({ properties: {} })
    const uiSchema: UiSchema = reactive({})
    const model: any = reactive({})
    return {
      schema,
      uiSchema,
      model
    }
  }
})
</script>

<style scoped>
</style>
