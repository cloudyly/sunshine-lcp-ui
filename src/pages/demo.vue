<!--
 * @Title: demo
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2021/11/12 6:20 PM
 *     Date          UpdateBy        Description
 * 2021/11/12 6:20 PM   dscloudy    Create File.
 -->
<template>
  <div>This is sub page - demo!</div>
  <h1 v-for="i in 20" :key="i">Hello - {{i}}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'demo'
})
</script>

<style scoped>
</style>
