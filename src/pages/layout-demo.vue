<!--
 * @Title: layout-demo
 * @Description: 布局组件
 * @Author: dscloudy 小云哥
 * @Date: 2021/11/10 10:22 PM
 *     Date          UpdateBy        Description
 * 2021/11/10 10:22 PM   dscloudy    Create File.
 -->
<template>
  <div class="full-screen">
    <ss-layout :type="layoutType" :is-expand="isExpand" left-width-mini="100px">
      <template #left>
        左侧菜单
      </template>
      <template #top>顶部菜单</template>
      <template #main>
        <p>
        切换布局:
        <select v-model="layoutType" @change="onLayoutTypeChange">
          <option value="lr">左 - 右</option>
          <option value="tb">上 - 下</option>
          <option value="ltb">左 - 上 - 下</option>
          <option value="tlr">上 - 左 - 右</option>
        </select>
        </p>
        <p>
          <button @click="onToggleLeft">切换左侧</button>
        </p>
        <h1>Hello Content</h1>
        <h1>Hello Content</h1>
        <h1>Hello Content</h1>
        <h1>Hello Content</h1>
        <h1>Hello Content</h1>
        <h1>Hello Content</h1>
      </template>
    </ss-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'layout-demo',
  setup () {
    const layoutType = ref<string>('lr')
    const onLayoutTypeChange = () => {
      console.log(layoutType.value)
    }
    const isExpand = ref<boolean>(true)
    const onToggleLeft = () => {
      isExpand.value = !isExpand.value
    }
    return {
      layoutType,
      onLayoutTypeChange,
      isExpand,
      onToggleLeft
    }
  }
})
</script>

<style scoped lang="scss">
::v-deep .SsLayout {
  .top {
    background-color: darkblue;
    color: white;
  }

  .bottom {
    background-color: #15aabf;
  }

  .left {
    background-color: #845ef7;
  }

  .right {
    background-color: #a9e34b;
  }
}
</style>
