<!--
 * @Title: layout
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2021/11/12 6:16 PM
 *     Date          UpdateBy        Description
 * 2021/11/12 6:16 PM   dscloudy    Create File.
 -->
<template>
  <div class="full-screen">
    <ss-layout type="tlr">
      <template #top>
        <ss-header-bar logo="logo.png"
                       app-name="XXX后台管理"
                       :is-show-toggle-left="true"
                       :is-show-toggle-screen="true"
                       :nav-list="navList"
                       full-name="张三"
        ></ss-header-bar>
      </template>
      <template #left>
        <ss-left-side></ss-left-side>
      </template>
    </ss-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { NavItem } from '@/components/header-bar/src/header-bar'

export default defineComponent({
  name: 'layout',
  setup () {
    const navList = reactive<NavItem[]>([
      { code: 'member', name: '会员管理' },
      { code: 'point', name: '积分管理' },
      { code: 'promotion', name: '营销管理' },
      { code: 'system', name: '系统管理' }
    ])
    return {
      navList
    }
  }
})
</script>

<style scoped lang="scss">
:deep(.SsLayout) {
  .left {
    background-color: #e1ddec;
  }
}
</style>
