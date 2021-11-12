<!--
 * @Title: layout
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2021/11/12 6:16 PM
 *     Date          UpdateBy        Description
 * 2021/11/12 6:16 PM   dscloudy    Create File.
 -->
<template>
  <ss-layout type="tlr">
    <template #top>
      <ss-header-bar></ss-header-bar>
    </template>
    <template #left>Left Nav</template>
<!--    <template #main>Main</template>-->
  </ss-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'layout'
})
</script>

<style scoped>
</style>
