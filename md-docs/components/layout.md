# SsLayout 主界面布局

![](.layout_images/布局类型示意图.png)

## 组件 API

### Attributes 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| type | 布局类型 | String | `lr` - 左右布局 / `tb` - 上下布局 / `tlr` 上下布局（下侧分为左右布局） / `ltb` - 左右布局（右侧再上下布局）  | `lr` |
| top-height | 顶部高度 |  String | - | 48px |
| left-width | 左侧宽度 |  String | - | 200px |
| left-width-mini | 左侧收缩后宽度 |  String | - | 80px |
| is-expand | 左侧是否展开 |  Boolean | true / false | true |
| is-show-page-tab | 是否显示页签 | Boolean | true / false | True |

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
| top | 顶部插槽（仅对`type`为`tb`, `ltb`, `tlr`类型生效） | 无 |
| left | 左侧插槽（仅对 `type` 为 `lr`, `ltb`, `tlr`类型生效） | 无 |
| main | 主体内容区域插槽，如果未设置改插槽，默认为 <router-view /> | 无 |

