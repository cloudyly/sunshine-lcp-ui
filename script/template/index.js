const utils = require('../common/utils')

const indexTsTpl = (componentName) => {
  const camelName = utils.convertCamel(componentName)

  return `import { App } from 'vue'
import ${camelName} from './src/${componentName}'

${camelName}.install = (app: App) => {
  app.component(${camelName}.name, ${camelName})
}

export default ${camelName}
`
}

const componentTsxTpl = componentName => {
  const camelName = utils.convertCamel(componentName)
  return `import { defineComponent } from 'vue'

const NAME = '${camelName}'

export default defineComponent({
  name: NAME,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        ${componentName}
      </div>
    )
  }
})
`
}

const scssTpl = componentName => {
  const camelName = utils.convertCamel(componentName)
  return `@import "../tools/sassMagic";
@import "../acss/mp";

@include b('${camelName}') {
}
`
}

const importScssTpl = componentName => {
  return `@import "./${componentName}";
`
}

const docTpl = componentName => {
  const camelName = utils.convertCamel(componentName)
  return `# ${camelName}

## 组件 API

### Attributes 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
|  |  |  |  | |

### Methods 方法

| 方法名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Events 事件

| 事件名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Slots 插槽

| 插槽名 | 说明 | 参数 |
|  ----  | ----  | ----  |
|  |  |  |
`
}

module.exports = {
  indexTsTpl,
  componentTsxTpl,
  scssTpl,
  importScssTpl,
  docTpl
}
