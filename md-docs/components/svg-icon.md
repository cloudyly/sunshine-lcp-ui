# SsSvgIcon

使用 ss-svg-icon，需要安装依赖，并进行 vue.config.js 的配置

```shell
yarn add svg-sprite-loader -D
```

vue.config.js 配置

```javascript
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.test(/\.svg$/)
      .include.add(resolve('src/components/svg-icon/icons')).add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
      .end()
  }
```

## 组件 API

### Attributes 属性


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | -------- | -------- |
| icon | 图标名称（省略前缀icon-） | String |        |        |
| class-name | 图标的class样式 | String | | |

### Methods 方法


| 方法名 | 说明 | 参数 | 返回值 |
| -------- | ------ | ------ | -------- |
|        |      |      |        |

### Events 事件


| 事件名 | 说明 | 参数 | 返回值 |
| -------- | ------ | ------ | -------- |
|        |      |      |        |

### Slots 插槽


| 插槽名 | 说明 | 参数 |
| -------- | ------ | ------ |
|        |      |      |
